import React from 'react';

// Components
import CompaignList from 'src/components/_admin/compaigns/compaignList';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Compaigns - freshpetals',
  applicationName: 'freshpetals',
  authors: 'freshpetals'
};
export default function Compaigns() {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Compaigns List"
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin'
          },
          {
            name: 'Compaigns'
          }
        ]}
        action={{
          href: `/admin/compaigns/add`,
          title: 'Add Compaign'
        }}
      />
      <CompaignList />
    </>
  );
}
