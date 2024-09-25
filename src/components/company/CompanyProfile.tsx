import React from "react";
import { Button, Container, CssBaseline, Typography } from "@mui/material";

export default function CompanyProfile() {
  return (
    <Container>
      <CssBaseline />
      <div className="company-info"></div>
      <div className="employee-list"></div>
      <div className="projects"></div>
      <Typography
        component="h1"
        variant="h2"
      >
        Company Information
      </Typography>
      <Typography
        component="h2"
        variant="h4"
      >
        Company Name: [Company Name]
        <br /> Location: [Location]
      </Typography>

      <Button>Edit Info</Button>
    </Container>
  );
}
