import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h3" color="primary">
        Hola que hace
      </Typography>
    </Layout>
  );
};

export default HomePage;
