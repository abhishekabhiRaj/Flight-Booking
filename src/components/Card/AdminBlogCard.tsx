import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Stack } from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import BlogFormModal, { BlogFormData } from '../Modal/BlogFormModal';

interface AdminBlogCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  readTime?: number;
  onDelete?: () => void;
  onSuccess?: () => void;
}

const AdminBlogCard = ({ 
  id, 
  title, 
  description, 
  image, 
  category = 'ADVENTURE',
  readTime = 5,
  onDelete, 
  onSuccess 
}: AdminBlogCardProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  
  const onEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdateBlog = async (data: BlogFormData) => {
    try {
      setIsUpdating(true);
      const blogRef = doc(db, 'blogs', id);
      
      await updateDoc(blogRef, {
        ...data,
        updatedAt: serverTimestamp()
      });

      setIsModalOpen(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card sx={{ width: '100%', boxShadow: 1 }}>
      <CardMedia
        component="img"
        height="200"
        image={image || "https://placehold.co/300x200"}
        alt={title}
      />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton 
              onClick={onEdit}
              size="small"
              disabled={isUpdating}
              sx={{ color: 'text.secondary' }}
            >
              <Edit size={20} />
            </IconButton>
            <IconButton 
              onClick={onDelete}
              size="small"
              disabled={isUpdating}
              sx={{ color: 'error.main' }}
            >
              <Trash2 size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
      <BlogFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        isEdit={true}
        initialData={{
          header: title,
          description: description,
          imageUrl: image,
          category,
          readTime
        }}
        blogId={id}
        onSuccess={onSuccess}
        onSubmit={handleUpdateBlog}
      />
    </Card>
  );
};

export default AdminBlogCard; 