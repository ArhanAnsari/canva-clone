import { protectServer } from '@/features/auth/utils';

import { Banner } from './banner';
import { ProjectsSection } from './projects-section';

const HomePage = async () => {
  await protectServer();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <ProjectsSection />
    </div>
  );
};

export default HomePage;
