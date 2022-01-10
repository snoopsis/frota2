import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Footer = () => {
  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <Typography variant="body2" gutterBottom>
        <Link href="https://migueldias.net" style={{ color: "#000" }}>
          @ migueldias.net
        </Link>
      </Typography>
    </div>
  );
};

export default Footer;
