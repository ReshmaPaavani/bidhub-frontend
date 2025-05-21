import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, XCircle, Image, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAuction } from '../../hooks/useAuction';
import { AuctionFormData } from '../../types';
import { addDays } from 'date-fns';

export const AuctionForm = () => {
  const [formData, setFormData] = useState<Partial<AuctionFormData>>({
    title: '',
    description: '',
    category: '',
    startPrice: 0,
    images: [],
    endTime: addDays(new Date(), 7), // Default to 7 days from now
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { user } = useAuth();
  const { createAuction } = useAuction();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'startPrice') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const date = new Date(value);
    setFormData((prev) => ({ ...prev, endTime: date }));
  };

  const addImageUrl = () => {
    if (imageUrls.length > 0) {
      const newUrl = imageUrls[0].trim();
      
      if (newUrl && !formData.images?.includes(newUrl)) {
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), newUrl],
        }));
        setImageUrls(['']);
      }
    }
  };

  const removeImage = (urlToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((url) => url !== urlToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.startPrice || formData.startPrice <= 0) {
      newErrors.startPrice = 'Starting price must be greater than 0';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    } else if (formData.endTime <= new Date()) {
      newErrors.endTime = 'End time must be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use placeholder images if none provided
      if (!formData.images?.length) {
        formData.images = ['https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg'];
      }
      
      const auctionData: AuctionFormData = {
        title: formData.title!,
        description: formData.description!,
        category: formData.category!,
        startPrice: formData.startPrice!,
        endTime: formData.endTime!,
        images: formData.images,
        sellerId: user.id,
        sellerName: user.name,
      };
      
      const auctionId = await createAuction(auctionData);
      if (auctionId) {
        navigate(`/auctions/${auctionId}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Item Details</h2>
          <p className="text-gray-600">Provide information about the item you're selling</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input w-full ${errors.title ? 'border-error' : ''}`}
              placeholder="e.g., Vintage Rolex Submariner"
            />
            {errors.title && <p className="mt-1 text-sm text-error">{errors.title}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.description ? 'border-error' : ''
              }`}
              placeholder="Describe your item in detail - condition, history, features, etc."
            />
            {errors.description && <p className="mt-1 text-sm text-error">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input w-full ${errors.category ? 'border-error' : ''}`}
            >
              <option value="">Select a category</option>
              <option value="Art">Art</option>
              <option value="Antiques">Antiques</option>
              <option value="Automobiles">Automobiles</option>
              <option value="Books & Literature">Books & Literature</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Electronics">Electronics</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Musical Instruments">Musical Instruments</option>
              <option value="Photography">Photography</option>
              <option value="Watches">Watches</option>
            </select>
            {errors.category && <p className="mt-1 text-sm text-error">{errors.category}</p>}
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Images</h2>
          <p className="text-gray-600">Add photos of your item (max 5 images)</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter image URL"
                className="input w-full"
                value={imageUrls[0] || ''}
                onChange={(e) => setImageUrls([e.target.value])}
              />
            </div>
            <button
              type="button"
              onClick={addImageUrl}
              disabled={(formData.images?.length || 0) >= 5}
              className="btn btn-outline"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add
            </button>
          </div>
          
          {formData.images && formData.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {formData.images.map((url, index) => (
                <div key={index} className="group relative rounded-md border border-gray-200 overflow-hidden">
                  <img src={url} alt="Item" className="h-32 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute right-2 top-2 rounded-full bg-white/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {(!formData.images || formData.images.length === 0) && (
            <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-center">
              <Image className="mb-2 h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">No images added yet</p>
              <p className="text-xs text-gray-400">A default image will be used if none are provided</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Auction Details</h2>
          <p className="text-gray-600">Set your starting price and auction duration</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="startPrice" className="mb-1 block text-sm font-medium text-gray-700">
              Starting Price ($)*
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="startPrice"
                name="startPrice"
                min="0.01"
                step="0.01"
                value={formData.startPrice}
                onChange={handleChange}
                className={`input w-full pl-7 ${errors.startPrice ? 'border-error' : ''}`}
                placeholder="0.00"
              />
            </div>
            {errors.startPrice && <p className="mt-1 text-sm text-error">{errors.startPrice}</p>}
          </div>
          
          <div>
            <label htmlFor="endTime" className="mb-1 block text-sm font-medium text-gray-700">
              End Date and Time*
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime?.toISOString().slice(0, 16)}
                onChange={handleDateChange}
                className={`input w-full pl-10 ${errors.endTime ? 'border-error' : ''}`}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            {errors.endTime && <p className="mt-1 text-sm text-error">{errors.endTime}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary px-8"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Creating...
            </span>
          ) : (
            'Create Auction'
          )}
        </button>
      </div>
    </form>
  );
};