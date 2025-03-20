import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Stack, 
  TextField, 
  Button, 
  IconButton,
  Typography,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { X } from 'lucide-react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Blog } from '../../types/blog';
import { imagekit } from '../../config/imagekit';

interface BlogFormModalProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  onSubmit: (data: BlogFormData) => void;
  initialData?: BlogFormData;
  blogId?: string;
  onSuccess?: () => void;
}

export interface BlogFormData {
  header: string;
  description: string;
  imageUrl?: string;
  imageFileId?: string;
}

interface ImageUploadResult {
  url: string;
  fileId: string;
}

const BlogFormModal = ({ 
  open, 
  onClose, 
  isEdit = false, 
  onSubmit,
  initialData,
  blogId,
  onSuccess 
}: BlogFormModalProps) => {
  const [formData, setFormData] = React.useState<BlogFormData>({
    header: initialData?.header || '',
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl || '',
    imageFileId: initialData?.imageFileId || ''
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadImage = async (file: File): Promise<ImageUploadResult> => {
    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = reader.result as string;
          // Remove data:image/jpeg;base64, from the string
          const base64String = base64.split(',')[1];
          resolve(base64String);
        };
      });
      reader.readAsDataURL(file);
      
      const base64String = await base64Promise;
      
      // Upload to ImageKit
      const result = await imagekit.upload({
        file: base64String,
        fileName: `blog-${Date.now()}-${file.name}`,
        folder: "/blog-images"
      });

      return {
        url: result.url,
        fileId: result.fileId
      };
    } catch (error) {
      console.error('Error uploading image to ImageKit:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imageUrl
      }));
    }
  };

  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogId) return;

    try {
      setIsLoading(true);
      setError(null);
      let imageUrl = formData.imageUrl;
      let imageResult: ImageUploadResult | undefined;

      // If imageUrl is a blob URL (new upload), upload it to ImageKit
      if (formData.imageUrl?.startsWith('blob:')) {
        const response = await fetch(formData.imageUrl);
        const blob = await response.blob();
        imageResult = await uploadImage(new File([blob], 'image.jpg'));
        
        // If you want to delete the old image
        if (initialData?.imageFileId) {
          try {
            await imagekit.deleteFile(initialData.imageFileId);
          } catch (error) {
            console.error('Error deleting old image:', error);
          }
        }

        imageUrl = imageResult.url;
      }

      const blogRef = doc(db, 'blogs', blogId);
      await updateDoc(blogRef, {
        header: formData.header,
        description: formData.description,
        imageUrl: imageUrl || null,
        imageFileId: imageResult?.fileId,
        updatedAt: serverTimestamp()
      });

      setSuccessMessage('Blog updated successfully!');
      onSuccess?.();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Failed to update blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isEdit) {
      handleEditBlog(e);
    } else {
      e.preventDefault();
      setIsLoading(true);
      try {
        await onSubmit(formData);
        setSuccessMessage('Blog created successfully!');
        setTimeout(() => {
          onClose();
        }, 1000);
      } catch (error) {
        setError('Failed to create blog. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h5">
            {isEdit ? 'Edit Blog' : 'Create New Blog'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Stack spacing={1}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="blog-image-input"
                />
                <label htmlFor="blog-image-input">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ 
                      py: 2,
                      borderStyle: 'dashed',
                      bgcolor: 'grey.50'
                    }}
                  >
                    Choose file
                  </Button>
                </label>
                <Typography variant="body2" color="text.secondary">
                  {formData.imageUrl ? 'Image selected' : 'No file chosen'}
                </Typography>
                {formData.imageUrl && (
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    style={{ 
                      width: '100%', 
                      height: 200, 
                      objectFit: 'cover',
                      borderRadius: 4 
                    }} 
                  />
                )}
              </Stack>

              <TextField
                name="header"
                label="Blog Header"
                value={formData.header}
                onChange={handleInputChange}
                fullWidth
              />

              <TextField
                name="description"
                label="Blog Description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />

              <Button 
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  isEdit ? 'Update Blog' : 'Create Blog'
                )}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlogFormModal; 