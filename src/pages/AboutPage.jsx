import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';

const AboutPage = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
      {/* Hero Section */}

      {/* Project Objectives */}
      <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 }, backgroundColor: 'background.paper' }}>
        <Typography variant='h4' fontWeight='bold' textAlign='center' mb={4}>
          What Drives Explora
        </Typography>
        <Grid container spacing={4}>
          {[
            'AI-driven personalized recommendations.',
            'Simplifying content discovery across genres.',
            'Creating an intuitive and engaging user experience.',
            'Exploring cutting-edge technologies in entertainment.',
          ].map((objective, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', backgroundColor: 'background.default' }}>
                <CardContent>
                  <Typography
                    variant='h6'
                    textAlign='center'
                    fontWeight='bold'
                    gutterBottom
                    color='text.primary'
                  >
                    {objective}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Key Features */}
      <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 }, backgroundColor: 'background.paper' }}>
        <Typography variant='h4' fontWeight='bold' textAlign='center' mb={4}>
          Why Choose Explora?
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: 'AI-Powered Recommendations', description: 'Advanced algorithms for tailored suggestions.' },
            { title: 'Comprehensive Database', description: 'A vast collection of movies and TV shows.' },
            { title: 'Intuitive Design', description: 'Clean and user-friendly interface.' },
            { title: 'Real-Time Updates', description: 'Stay updated with trending content.' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', backgroundColor: 'background.default' }}>
                <CardContent>
                  <Typography variant='h6' fontWeight='bold' gutterBottom color='text.primary'>
                    {feature.title}
                  </Typography>
                  <Typography color='text.secondary'>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recommendation Workflow */}
      <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 }, backgroundColor: 'background.paper' }}>
        <Typography variant='h4' fontWeight='bold' textAlign='center' mb={4}>
          How Explora Works
        </Typography>
        <Grid container spacing={4}>
          {[
            'Input Preferences: Share your likes and dislikes.',
            'Analyze Trends: AI processes your data and media trends.',
            'Machine Learning Magic: Predictions tailored to you.',
            'Tailored Suggestions: Recommendations aligned with your taste.',
          ].map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', backgroundColor: 'background.default' }}>
                <CardContent>
                  <Typography
                    variant='h6'
                    textAlign='center'
                    fontWeight='bold'
                    gutterBottom
                    color='text.primary'
                  >
                    {step.split(':')[0]}
                  </Typography>
                  <Typography color='text.secondary'>{step.split(':')[1]}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant='h4' fontWeight='bold' color='white' mb={2}>
          Start Your Exploration Today!
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          sx={{ margin: '0 16px', padding: '10px 20px' }}
          onClick={() => (window.location.href = '/recommendation')}
        >
          Try Now
        </Button>
        <Button
          variant='outlined'
          color='inherit'
          sx={{ margin: '0 16px', padding: '10px 20px' }}
          onClick={() => (window.location.href = '/contact')}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default AboutPage;
