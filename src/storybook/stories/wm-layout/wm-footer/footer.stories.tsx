import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Link, IconButton, Divider, Grid } from "@mui/material";

import FooterDefaultExport from "../../../../components/layout/footer/index";

const meta: Meta<typeof FooterDefaultExport> = {
  title: "Layout/Footer",
  component: FooterDefaultExport,
  argTypes: {
    show: { control: "boolean" },
    className: { control: "text" },
  },
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

export const Default: Story = {
  render: Template,
  args: {
    name: "footer1",
    listener: mockListener,
    children: (
      <Box p={3} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          © 2024 Company Name. All rights reserved.
        </Typography>
      </Box>
    ),
  },
};

export const SimpleFooter: Story = {
  render: Template,
  args: {
    name: "simpleFooter",
    listener: mockListener,
    children: (
      <Box p={2} textAlign="center" bgcolor="#f5f5f5">
        <Typography variant="body2">
          © 2024 My Application. All rights reserved.
        </Typography>
      </Box>
    ),
  },
};

export const FooterWithLinks: Story = {
  render: Template,
  args: {
    name: "footerWithLinks",
    listener: mockListener,
    children: (
      <Box p={3} bgcolor="#2c3e50" color="#ffffff">
        <Stack direction="row" spacing={3} justifyContent="center">
          <Link href="#" color="inherit" underline="hover">
            About
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Contact
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Stack>
        <Typography variant="body2" textAlign="center" mt={2}>
          © 2024 Company Name. All rights reserved.
        </Typography>
      </Box>
    ),
  },
};

export const MultiColumnFooter: Story = {
  render: Template,
  args: {
    name: "multiColumnFooter",
    listener: mockListener,
    children: (
      <Box p={4} bgcolor="#1a1a1a" color="#ffffff">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Careers
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Press
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">
                Features
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Pricing
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Downloads
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">
                Help Center
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Documentation
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Contact Us
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Terms of Service
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Cookie Policy
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: "#ffffff33" }} />
        <Typography variant="body2" textAlign="center">
          © 2024 Company Name. All rights reserved.
        </Typography>
      </Box>
    ),
  },
};

export const FooterWithSocialMedia: Story = {
  render: Template,
  args: {
    name: "footerSocial",
    listener: mockListener,
    children: (
      <Box p={3} bgcolor="#34495e" color="#ffffff">
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" spacing={2}>
            <IconButton sx={{ color: "#ffffff" }} aria-label="Facebook">
              <i className="fa fa-facebook" />
            </IconButton>
            <IconButton sx={{ color: "#ffffff" }} aria-label="Twitter">
              <i className="fa fa-twitter" />
            </IconButton>
            <IconButton sx={{ color: "#ffffff" }} aria-label="LinkedIn">
              <i className="fa fa-linkedin" />
            </IconButton>
            <IconButton sx={{ color: "#ffffff" }} aria-label="Instagram">
              <i className="fa fa-instagram" />
            </IconButton>
            <IconButton sx={{ color: "#ffffff" }} aria-label="GitHub">
              <i className="fa fa-github" />
            </IconButton>
          </Stack>
          <Typography variant="body2">
            © 2024 Company Name. All rights reserved.
          </Typography>
        </Stack>
      </Box>
    ),
  },
};

export const CompactFooter: Story = {
  render: Template,
  args: {
    name: "compactFooter",
    listener: mockListener,
    children: (
      <Box
        p={1.5}
        bgcolor="#f0f0f0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="caption" color="text.secondary">
          © 2024 App Name
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link href="#" variant="caption" color="text.secondary">
            Privacy
          </Link>
          <Link href="#" variant="caption" color="text.secondary">
            Terms
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const LargeFooter: Story = {
  render: Template,
  args: {
    name: "largeFooter",
    listener: mockListener,
    children: (
      <Box bgcolor="#212121" color="#ffffff">
        <Box p={5}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Company Name
              </Typography>
              <Typography variant="body2" color="#b0b0b0" mb={2}>
                Building amazing products that help people achieve their goals and dreams.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" sx={{ color: "#ffffff" }}>
                  <i className="fa fa-facebook" />
                </IconButton>
                <IconButton size="small" sx={{ color: "#ffffff" }}>
                  <i className="fa fa-twitter" />
                </IconButton>
                <IconButton size="small" sx={{ color: "#ffffff" }}>
                  <i className="fa fa-linkedin" />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="h6" gutterBottom>
                Product
              </Typography>
              <Stack spacing={1.5}>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Features
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Pricing
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Enterprise
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Roadmap
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Stack spacing={1.5}>
                <Link href="#" color="#b0b0b0" underline="hover">
                  About
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Blog
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Careers
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Press
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              <Stack spacing={1.5}>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Documentation
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Help Center
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  API Reference
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Community
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="h6" gutterBottom>
                Legal
              </Typography>
              <Stack spacing={1.5}>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Privacy
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Terms
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Security
                </Link>
                <Link href="#" color="#b0b0b0" underline="hover">
                  Cookies
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ bgcolor: "#404040" }} />
        <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="#b0b0b0">
            © 2024 Company Name. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" variant="body2" color="#b0b0b0">
              Privacy Policy
            </Link>
            <Link href="#" variant="body2" color="#b0b0b0">
              Terms of Service
            </Link>
          </Stack>
        </Box>
      </Box>
    ),
  },
};

export const StickyFooter: Story = {
  render: Template,
  args: {
    name: "stickyFooter",
    listener: mockListener,
    styles: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    children: (
      <Box p={2} bgcolor="#ffffff" borderTop="1px solid #e0e0e0">
        <Typography variant="body2" textAlign="center" color="text.secondary">
          © 2024 Application Name. All rights reserved.
        </Typography>
      </Box>
    ),
  },
};

export const ColoredFooter: Story = {
  render: Template,
  args: {
    name: "coloredFooter",
    listener: mockListener,
    children: (
      <Box p={3} bgcolor="#1976d2" color="#ffffff">
        <Typography variant="body1" textAlign="center" fontWeight="500">
          © 2024 Brand Name. Powered by Innovation.
        </Typography>
      </Box>
    ),
  },
};

export const FooterWithNewsletter: Story = {
  render: Template,
  args: {
    name: "footerNewsletter",
    listener: mockListener,
    children: (
      <Box p={4} bgcolor="#263238" color="#ffffff">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2" color="#b0b0b0">
              Get the latest updates and news delivered to your inbox.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1}>
              <Box
                component="input"
                type="email"
                placeholder="Enter your email"
                sx={{
                  flex: 1,
                  padding: "10px 16px",
                  border: "1px solid #404040",
                  borderRadius: "4px",
                  backgroundColor: "#37474f",
                  color: "#ffffff",
                  "&::placeholder": {
                    color: "#b0b0b0",
                  },
                }}
              />
              <Box
                component="button"
                sx={{
                  padding: "10px 24px",
                  backgroundColor: "#1976d2",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Subscribe
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: "#404040" }} />
        <Typography variant="body2" textAlign="center" color="#b0b0b0">
          © 2024 Company Name. All rights reserved.
        </Typography>
      </Box>
    ),
  },
};

export const FooterWithContact: Story = {
  render: Template,
  args: {
    name: "footerContact",
    listener: mockListener,
    children: (
      <Box p={4} bgcolor="#eceff1">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                <i className="fa fa-map-marker" style={{ marginRight: 8 }} />
                123 Main Street, City, State 12345
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <i className="fa fa-phone" style={{ marginRight: 8 }} />
                (123) 456-7890
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <i className="fa fa-envelope" style={{ marginRight: 8 }} />
                contact@company.com
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="text.secondary" underline="hover">
                Home
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Services
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Portfolio
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ bgcolor: "#1976d2", color: "#ffffff" }}>
                <i className="fa fa-facebook" />
              </IconButton>
              <IconButton size="small" sx={{ bgcolor: "#1da1f2", color: "#ffffff" }}>
                <i className="fa fa-twitter" />
              </IconButton>
              <IconButton size="small" sx={{ bgcolor: "#0077b5", color: "#ffffff" }}>
                <i className="fa fa-linkedin" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" textAlign="center" color="text.secondary">
          © 2024 Company Name. All rights reserved.
        </Typography>
      </Box>
    ),
  },
};

export const MinimalistFooter: Story = {
  render: Template,
  args: {
    name: "minimalistFooter",
    listener: mockListener,
    children: (
      <Box p={2} borderTop="1px solid #e0e0e0">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            © 2024 Brand
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" variant="body2">
              Privacy
            </Link>
            <Link href="#" variant="body2">
              Terms
            </Link>
            <Link href="#" variant="body2">
              Contact
            </Link>
          </Stack>
        </Stack>
      </Box>
    ),
  },
};

export const GradientFooter: Story = {
  render: Template,
  args: {
    name: "gradientFooter",
    listener: mockListener,
    children: (
      <Box
        p={4}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom>
              Stay Connected
            </Typography>
            <Typography variant="body2">
              Follow us on social media for the latest updates
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
              <i className="fa fa-facebook" />
            </IconButton>
            <IconButton sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
              <i className="fa fa-twitter" />
            </IconButton>
            <IconButton sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
              <i className="fa fa-instagram" />
            </IconButton>
            <IconButton sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
              <i className="fa fa-youtube" />
            </IconButton>
          </Stack>
          <Typography variant="body2" textAlign="center">
            © 2024 Company Name. All rights reserved.
          </Typography>
        </Stack>
      </Box>
    ),
  },
};

export const FooterWithBadges: Story = {
  render: Template,
  args: {
    name: "footerBadges",
    listener: mockListener,
    children: (
      <Box p={3} bgcolor="#f9f9f9">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              © 2024 App Name
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Box
                component="img"
                src="https://via.placeholder.com/120x40/000/fff?text=App+Store"
                alt="App Store"
                sx={{ height: 40, cursor: "pointer" }}
              />
              <Box
                component="img"
                src="https://via.placeholder.com/120x40/000/fff?text=Google+Play"
                alt="Google Play"
                sx={{ height: 40, cursor: "pointer" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Link href="#" variant="body2">
                Privacy
              </Link>
              <Link href="#" variant="body2">
                Terms
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    ),
  },
};

export const DarkFooter: Story = {
  render: Template,
  args: {
    name: "darkFooter",
    listener: mockListener,
    children: (
      <Box p={3} bgcolor="#000000" color="#ffffff">
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6">Company Name</Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" color="inherit" underline="hover">
              About
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Services
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Contact
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Blog
            </Link>
          </Stack>
          <Typography variant="body2" color="#888888">
            © 2024 All rights reserved.
          </Typography>
        </Stack>
      </Box>
    ),
  },
};

export const LightFooter: Story = {
  render: Template,
  args: {
    name: "lightFooter",
    listener: mockListener,
    children: (
      <Box p={3} bgcolor="#ffffff" borderTop="2px solid #f0f0f0">
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6" color="primary">
            Brand Name
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" underline="hover">
              Features
            </Link>
            <Link href="#" underline="hover">
              Pricing
            </Link>
            <Link href="#" underline="hover">
              Support
            </Link>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            © 2024 Brand Name. All rights reserved.
          </Typography>
        </Stack>
      </Box>
    ),
  },
};

export const ResponsiveFooter: Story = {
  render: Template,
  args: {
    name: "responsiveFooter",
    listener: mockListener,
    children: (
      <Box p={3} bgcolor="#37474f" color="#ffffff">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Product
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit">
                Features
              </Link>
              <Link href="#" color="inherit">
                Pricing
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit">
                About
              </Link>
              <Link href="#" color="inherit">
                Blog
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit">
                Help
              </Link>
              <Link href="#" color="inherit">
                Contact
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Social
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: "#ffffff" }}>
                <i className="fa fa-facebook" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#ffffff" }}>
                <i className="fa fa-twitter" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#ffffff" }}>
                <i className="fa fa-linkedin" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="body2" textAlign="center" mt={3}>
          © 2024 Company. All rights reserved.
        </Typography>
      </Box>
    ),
  },
};

export const CustomStyledFooter: Story = {
  render: Template,
  args: {
    name: "customStyledFooter",
    listener: mockListener,
    styles: {
      backgroundColor: "#ff5722",
      color: "#ffffff",
      padding: "24px",
      borderRadius: "8px 8px 0 0",
    },
    children: (
      <Typography variant="body1" textAlign="center" fontWeight="600">
        Custom Styled Footer with Inline Styles
      </Typography>
    ),
  },
};
