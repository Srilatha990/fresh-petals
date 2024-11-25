import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import PayoutsList from 'src/components/_admin/payouts';

// api
import * as api from 'src/services';

// Meta information
export const metadata = {
  title: 'Payouts - freshpetals',
  applicationName: 'freshpetals',
  authors: 'freshpetals'
};
export default async function page() {
  const { data: shops } = await api.getAllShopsByAdmin();
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Payouts"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Payouts'
          }
        ]}
      />
      <PayoutsList shops={shops} />
    </div>
  );
}
