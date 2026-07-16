import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import './App.css';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormRenderer from './components/FormRenderer/FormRenderer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { LOCAL_STORAGE_KEY } from './utils/constants';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [schema, setSchema] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  const [activeTab, setActiveTab] = useState(0);

  const handleReset = () => {
    const shouldReset = window.confirm(
      'This will clear all fields and the saved schema. Do you want to continue?',
    );

    if (shouldReset) {
      setSchema([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position='sticky' sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <Typography variant='h5' color='textPrimary' sx={{ flexGrow: 1 }}>
            Dynamic Form Builder
          </Typography>
          <Tooltip title='Clear saved schema'>
            <Button color='error' size='small' onClick={handleReset}>
              Reset
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth='md' sx={{ py: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label='Form Builder' />
          <Tab label='Form Renderer' />
        </Tabs>

        <Box sx={{ display: activeTab === 0 ? 'block' : 'none' }}>
          <FormBuilder schema={schema} onSchemaChange={setSchema} />
        </Box>

        <Box sx={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <FormRenderer schema={schema} />
        </Box>
      </Container>

      <ScrollToTop />
    </Box>
  );
}

export default App;
