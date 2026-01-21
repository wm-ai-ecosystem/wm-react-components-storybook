import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Link, IconButton, Divider, Grid } from "@mui/material";

import FooterDefaultExport from "../../../../components/layout/footer/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import footerTokensData from "../../../../designTokens/components/page-footer/page-footer.json";

const meta: Meta<typeof FooterDefaultExport> = {
  title: "Layout/Footer",
  component: FooterDefaultExport,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <FooterDefaultExport {...args} listener={mockListener}>
      {args.children}
    </FooterDefaultExport>
  </Box>
);

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      // styling={styling}
      token={token}
    />
  ),
  args: {
    name: "docsFooter",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: Template,
  args: {
    name: "footerShowcase",
    listener: mockListener,
    children: (
      <Stack spacing={4} px={{ xs: 2, md: 3 }} py={3}>

        {/* Header */}
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Footer Showcase
          </Typography>
        </Box>

        {/* Footer with Links */}
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Footer Links
          </Typography>

          <Box bgcolor="#2c3e50" color="#ffffff" px={3} py={3}>
            <Stack spacing={3} alignItems="center">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={4}
                alignItems="center"
              >
                <Link href="#" color="inherit" underline="hover">About</Link>
                <Link href="#" color="inherit" underline="hover">Contact</Link>
                <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
                <Link href="#" color="inherit" underline="hover">Terms of Service</Link>
              </Stack>

              <Divider flexItem sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                © 2024 Company Name. All rights reserved.
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Footer with Social Media */}
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Footer Social
          </Typography>

          <Box bgcolor="#34495e" color="#ffffff" px={3} py={3}>
            <Stack spacing={2} alignItems="center">
              <Stack direction="row" spacing={2}>
                {["facebook", "twitter", "linkedin", "instagram"].map((icon) => (
                  <IconButton
                    key={icon}
                    size="small"
                    sx={{
                      color: "#fff",
                      bgcolor: "rgba(255,255,255,0.12)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                    }}
                  >
                    <i className={`fa fa-${icon}`} />
                  </IconButton>
                ))}
              </Stack>

              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                © 2024 Company Name. All rights reserved.
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Footer with Contact */}
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Footer Contact
          </Typography>

          <Box bgcolor="#ffffff" px={3} py={3}>
            <Stack spacing={3}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={4}
              >
                {/* Contact */}
                <Stack spacing={1} flex={1}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    Contact Us
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <i className="fa fa-map-marker" style={{ marginRight: 6 }} />
                    123 Main Street, City
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <i className="fa fa-phone" style={{ marginRight: 6 }} />
                    (123) 456-7890
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <i className="fa fa-envelope" style={{ marginRight: 6 }} />
                    contact@company.com
                  </Typography>
                </Stack>

                {/* Quick Links */}
                <Stack spacing={1} flex={1}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    Quick Links
                  </Typography>
                  <Link underline="hover">Home</Link>
                  <Link underline="hover">Services</Link>
                  <Link underline="hover">Portfolio</Link>
                  <Link underline="hover">Contact</Link>
                </Stack>

                {/* Social */}
                <Stack spacing={1} flex={1}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    Follow Us
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" sx={{ bgcolor: "#1976d2", color: "#fff" }}>
                      <i className="fa fa-facebook" />
                    </IconButton>
                    <IconButton size="small" sx={{ bgcolor: "#1da1f2", color: "#fff" }}>
                      <i className="fa fa-twitter" />
                    </IconButton>
                    <IconButton size="small" sx={{ bgcolor: "#0077b5", color: "#fff" }}>
                      <i className="fa fa-linkedin" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>

              <Divider />

              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
              >
                © 2024 Company Name. All rights reserved.
              </Typography>
            </Stack>
          </Box>
        </Stack>

      </Stack>
    ),
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};


export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
      //component can't spread data-design-token-target, so we apply it to a wrapper
      const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
      return (
        <Box style={{ padding: 16, width:"100%" }} data-design-token-target={dataAttr}>
          <FooterDefaultExport {...componentArgs} listener={mockListener}>
            {componentArgs.children}
          </FooterDefaultExport>
        </Box>
      );
    },
  args: {
    name: "standardFooter",
    listener: mockListener,
    // show:true,
    children: (
      <Box p={3} textAlign="center">
        <Typography>
          © 2024 Wavemaker. All rights reserved.
        </Typography>
      </Box>
    ),
    "data-design-token-target":true
  },
  argTypes:{
    name:{table: { disable: true }},
    listener:{table: { disable: true }},
    "data-design-token-target": { table: { disable: true } },
    children:{table: { disable: true } }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: footerTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "footer",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};