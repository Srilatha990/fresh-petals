import { Box, Container } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import ProductList from 'src/components/_main/products';

// api
import * as api from 'src/services';

export const dynamic = 'error';
export const revalidate = 10;

export async function generateStaticParams() {
  const { data } = await api.getSubCategorySlugs();
  
  // Check for null/undefined parentCategory and slug to avoid errors
  return data?.map((cat) => {
    if (cat?.parentCategory?.slug && cat?.slug) {
      return {
        subCategory: cat.slug,
        category: cat.parentCategory.slug
      };
    }
    return null; // Filter out invalid categories/subcategories
  }).filter(Boolean); // Remove any null values
}

export async function generateMetadata({ params }) {
  const { data: response } = await api.getSubCategoryBySlug(params.subCategory);

  return {
    title: response?.metaTitle || 'Default Title',  // Use fallback value for title
    description: response?.metaDescription || 'Default description',  // Use fallback value for description
    openGraph: {
      images: [response?.cover?.url || 'default_image_url']  // Fallback for missing cover image
    }
  };
}

export default async function Listing({ params }) {
  const { category, subCategory } = params;
  const { data: subCategoryData } = await api.getSubCategoryTitle(subCategory);

  // Ensure subCategoryData and parentCategory are not null or undefined before rendering
  const categoryName = subCategoryData?.parentCategory?.name || 'Unknown Category';
  const subCategoryName = subCategoryData?.name || 'Unknown SubCategory';

  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading={subCategoryName}
            links={[
              {
                name: 'Home',
                href: '/'
              },
              {
                name: 'Products',
                href: '/products'
              },
              {
                name: categoryName,
                href: `/products/${category}`
              },
              {
                name: subCategoryName
              }
            ]}
          />
          <ProductList subCategory={subCategoryData} />
        </Container>
      </Box>
    </Box>
  );
}
