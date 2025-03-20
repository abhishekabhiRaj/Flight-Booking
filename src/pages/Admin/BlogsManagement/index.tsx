import { useState, useEffect } from 'react';
import { ArrowLeft, Divide } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../config/firebase';
import BlogCard from '../../../components/Card/BlogCard';
import BlogFormModal, { BlogFormData } from '../../../components/Modal/BlogFormModal';
import { Blog } from '../../../types/blog';

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsCollection = collection(db, 'blogs');
      const blogsSnapshot = await getDocs(blogsCollection);
      const blogsList = blogsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Blog[];
      setBlogs(blogsList);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const uploadImage = async (imageFile: File): Promise<string> => {
    const storageRef = ref(storage, `blog-images/${Date.now()}-${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    return getDownloadURL(storageRef);
  };

  const handleCreateBlog = async (data: BlogFormData) => {
    try {
      setIsLoading(true);
      let imageUrl = data.imageUrl;

      // If imageUrl is a blob URL (new upload), upload it to storage
      if (data.imageUrl?.startsWith('blob:')) {
        const response = await fetch(data.imageUrl);
        const blob = await response.blob();
        imageUrl = await uploadImage(new File([blob], 'image.jpg'));
      }

      const blogData = {
        header: data.header,
        description: data.description,
        imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likesCount: 0,
        shareCount: 0
      };

      await addDoc(collection(db, 'blogs'), blogData);
      await fetchBlogs();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (blog: Blog) => {
    try {
      setIsLoading(true);
      // Delete image from storage
      if (blog.imageUrl) {
        const imageRef = ref(storage, blog.imageUrl);
        await deleteObject(imageRef);
      }

      // Delete blog document
      await deleteDoc(doc(db, 'blogs', blog.id));
      await fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
        className="w-full h-full"
    >
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mx={2}
            my={2}
        >
            <Typography variant="h4">Blogs Manager</Typography>
            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              disabled={isLoading}
            >
              Create Blog
            </Button>
        </Stack>

        <Divider className="w-full" /> 

        <Stack spacing={2} sx={{ p: 2 }}>
          {blogs.map((blog) => (
            <BlogCard 
              key={blog.id}
              id={blog.id}
              title={blog.header}
              description={blog.description}
              image={blog.imageUrl}
              onDelete={() => handleDeleteBlog(blog)}
              onSuccess={fetchBlogs}
            />
          ))}
        </Stack>

        <BlogFormModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          isEdit={false}
          onSubmit={ handleCreateBlog}
          initialData={ undefined}
        />
    </Stack>
  );
};

export default BlogsManagement; 
      