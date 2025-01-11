// app/docs/page.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

interface Section {
  title: string;
  id: string;
  content: string;
}

const sections: Section[] = [
  {
    title: "Getting Started",
    id: "getting-started",
    content: `
      PromptAI is a powerful AI-powered threading tool that helps you organize and analyze conversations.
      To get started, simply install the package using npm:
      
      npm install prompt-ai

      Then import and initialize PromptAI in your project:

      import { PromptAI  } from 'prompt-ai';
      
      const threadAI = new  PromptAI({
        apiKey: 'your-api-key'
      });
    `,
  },
  {
    title: "Key Features",
    id: "features",
    content: `
      • Automatic thread summarization
      • Sentiment analysis
      • Topic clustering
      • Real-time conversation analysis
      • Custom training capabilities
      • Multi-language support
      • Advanced filtering options
    `,
  },
  {
    title: "API Reference",
    id: "api",
    content: `
       PromptAI  exposes several key methods:

      analyze(text: string): Promise<Analysis>
      Performs comprehensive analysis on the provided text.

      train(data: TrainingData[]): Promise<void>
      Trains the model on custom data.

      summarize(Prompt: Prompt): Promise<Summary>
      Generates a concise summary of the entire thread.
    `,
  },
  {
    title: "Configuration",
    id: "configuration",
    content: `
      Configure PromptAI by passing options to the constructor:

      {
        apiKey: string;
        language?: string;
        modelSize?: 'small' | 'medium' | 'large';
        maxThreadLength?: number;
        customEndpoint?: string;
      }
    `,
  },
];

const theme = createTheme();

export default function DocsPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ mt: 8 }}>
      <List>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton onClick={() => scrollToSection(section.id)}>
              <ListItemText primary={section.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              PromptAI Documentation
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8,
          }}
        >
          <Container maxWidth="lg">
            {sections.map((section) => (
              <Paper
                key={section.id}
                id={section.id}
                sx={{ p: 3, mb: 3 }}
                elevation={2}
              >
                <Typography variant="h4" gutterBottom>
                  {section.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography component="div" sx={{ whiteSpace: "pre-wrap" }}>
                  {section.content}
                </Typography>
              </Paper>
            ))}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
