'use client';
import React from 'react';
import Link from 'next/link';
// mui
import { Box, Typography, Grid, Button, Container, Stack } from '@mui/material';
// icons
import { IoIosArrowForward } from 'react-icons/io';

// blur image
import bannerImg from '../../../../../public/images/banner-3.jpg';
// components
import BlurImage from 'src/components/blurImage';

export default function Banner() {
  return (
    <Box
      sx={{
        mt: 4,
        overflow: 'hidden',
        position: 'relative',
        display: { md: 'block', xs: 'none' }
      }}
    >
      <Box
        sx={{
          mt: 3,
          py: 12,
          position: 'relative'
        }}
      >
        <BlurImage
          src={bannerImg}
          alt="banner-3"
          placeholder="blur"
          layout="fill"
          static
          sizes="700px"
          objectFit="cover"
        />
        <Container maxWidth="xl">
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={6} md={6}>
              <Stack spacing={2}>
                <Typography sx={{ zIndex: 11 }} variant="h2" fontWeight={900}>
                "Your Trusted Source for Fresh Flowers Online"
                </Typography>
                <Typography sx={{ zIndex: 11 }} variant="body1" color="text.success">
                "Craving the beauty of fresh blooms without leaving your home? Look no further! At FreshPetals, we bring the finest, freshest flowers straight to your door. From seasonal picks to sustainably sourced premium blooms, we offer a wide selection to brighten any occasion."
                </Typography>
                <Box>
                  <Button
                    component={Link}
                    href="/products"
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<IoIosArrowForward />}
                    sx={{
                      borderRadius: 6
                    }}
                  >
                    View more
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
