import {
  Features,
  Footer,
  Hero,
  Highlights,
  HowItWorks,
  Model,
  Navbar,
} from "./components";

import * as Sentry from "@sentry/react";

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default Sentry.withProfiler(App);
