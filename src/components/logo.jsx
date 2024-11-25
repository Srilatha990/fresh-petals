import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image'
import netlogo from '../../public/images/Net-to-plate-text.png';
// mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Logo = () => {
  const theme = useTheme();
  const { push } = useRouter();
  return (
    <Box
      onClick={() => push('/')}
    >
      <Image src={netlogo} width={280} alt="freshpetals" object-fit="cover" style={{objectFit:"cover", cursor:"pointer"}} />
      
    </Box>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  isMobile: PropTypes.bool
};
export default Logo;
