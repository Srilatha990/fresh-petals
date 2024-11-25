// pages/refund-return-policy.js

import React from 'react';

// mui
import { Container, Typography } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

const RefundReturnPolicy = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <HeaderBreadcrumbs
        heading="Refund & return policy"
        links={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Refund & return policy'
          }
        ]}
      />
      <Typography variant="h3" component="h1" gutterBottom pt={3}>
      Refund & return policy
      </Typography>
      <Typography variant="body1" paragraph>
      Thank you for shopping at freshpetals. We want you to be completely satisfied with your purchase. If you are not entirely happy with your flowers or order, we’re here to help.

      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Returns
      </Typography>
      <Typography variant="body1" paragraph>
      You have 7 calendar days to return an item from the date you received it. Due to the perishable nature of flowers, returns are only accepted if the flowers arrive damaged, or if there was an error in your order. To be eligible for a return, your item must be unused, unarranged, and in the same condition that you received it. The item must be in the original packaging, and you must have the receipt or proof of purchase.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Refunds
      </Typography>
      <Typography variant="body1" paragraph>
      Once we receive your returned item, we will inspect it and notify you that we have received your returned flowers. We will immediately notify you of the status of your refund after reviewing the condition of the flowers.
      </Typography>
      <Typography variant="body1" paragraph>
      If your return is approved, we will process a refund to your original method of payment (credit card, PayPal, etc.). The refund will be credited within a certain number of days, depending on your card issuer’s policies.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Shipping
      </Typography>
      <Typography variant="body1" paragraph>
      You will be responsible for paying the shipping costs for returning your flowers. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
      If you have any questions about returning your flowers or need assistance, please contact us at support@freshpetals.com.
      </Typography>
    </Container>
  );
};

export default RefundReturnPolicy;
