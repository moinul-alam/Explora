import { Box, Typography, Stack } from '@mui/material';
import MediaTypeSelection from './MediaTypeSelection';

const ChatMessages = ({ messages }) => {
  return (
    <Stack spacing={1} sx={{ overflowY: 'auto', flexGrow: 1 }}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            bgcolor: msg.sender === 'user' ? '#2196f3' : '#e0e0e0',
            color: msg.sender === 'user' ? '#fff' : '#000',
            p: 1.5,
            borderRadius: 2,
            maxWidth: '75%',
            wordWrap: 'break-word'
          }}
        >
          {msg.type === 'selection' ? (
            <MediaTypeSelection /> // ✅ Render media type selection here
          ) : (
            <Typography>{msg.content}</Typography>
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default ChatMessages;
