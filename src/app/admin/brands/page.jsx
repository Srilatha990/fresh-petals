import React from 'react';

// Components
import BrandList from 'src/components/_admin/brands/brandList';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Brands - freshpetals',
  applicationName: 'freshpetals',
  authors: 'freshpetals'
};

export default function Brands() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Brands List"
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin'
          },
          {
            name: 'Brands'
          }
        ]}
        action={{
          href: `/admin/brands/add`,
          title: 'Add brand'
        }}
      />
      <BrandList />
    </>
  );
}