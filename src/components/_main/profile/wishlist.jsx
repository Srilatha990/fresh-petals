'use client';
import React from 'react';
import { useSelector } from 'react-redux';

// mui
import { Card, Grid } from '@mui/material';

// components
import NoDataFound from 'src/illustrations/dataNotFound';
import ProductCard from 'src/components/cards/product';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

export default function Wishlist() {
  const { wishlist } = useSelector(({ wishlist }) => wishlist);
  const { data, isLoading } = useQuery(['get-wishlist-products', wishlist], () => api.getWishlist(wishlist), {
    onError: (err) => toast.error(err.response.data.message || 'Something went wrong!')
  });

  const { userData } = useQuery(['user-profile'], () => api.getProfile(), {
    onSuccess: ({ userData }) => {
      setAvatarId(userData?.cover?._id || null);
    }
  });
 
  const user = userData?.data || {};
  console.log(user, 'user data2');
  if (user?.isVerified == false) {
    router.push('/auth/verify-otp');
  }

  const [avatarId, setAvatarId] = React.useState(null);
  return (
    <>
      <Grid container justifyContent="center" spacing={2} mt={2}>
        {!isLoading && !Boolean(data?.data.length) && (
          <Grid item md={12}>
            <Card>
              <NoDataFound />
            </Card>
          </Grid>
        )}

        {(isLoading ? Array.from(new Array(4)) : data?.data)?.map((item, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
            <ProductCard product={item} loading={isLoading} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
