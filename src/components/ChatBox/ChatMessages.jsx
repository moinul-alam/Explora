import { Box, Paper, Typography, Fade } from '@mui/material';

const ChatMessages = ({ messages }) => (
  <Box>
    {messages.map((message, index) => (
      <Fade key={index} in timeout={300}>
        <Box display="flex" justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
          <Paper sx={{
            p: 2, maxWidth: '70%',
            bgcolor: message.sender === 'user' ? 'error.dark' : 'background.secondary',
            borderRadius: message.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
          }}>
            <Typography>{message.content}</Typography>
          </Paper>
        </Box>
      </Fade>
    ))}
  </Box>
);

export default ChatMessages;
