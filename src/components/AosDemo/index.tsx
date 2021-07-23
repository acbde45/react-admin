import { Box } from '@material-ui/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ once: true });

export default function AosDemo(): JSX.Element {
  return (
    <div style={{ paddingTop: '100vh' }}>
      <Box style={{ width: 200 }} data-aos="zoom-in-up">
        Hello world
      </Box>
    </div>
  );
}
