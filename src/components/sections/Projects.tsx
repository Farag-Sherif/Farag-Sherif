import { memo } from 'react';
import { motion } from 'framer-motion';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import { projects, type Project } from '../../data/projects';
import { ProjectImage } from '../ui/ProjectImage';

const ProjectDisplay = memo(function ProjectDisplay({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  const isFullWidth = index % 3 === 0;
  const isSplit = index % 3 === 1;
  const isAsymmetrical = index % 3 === 2;

  return (
    <div className="relative w-full py-16 lg:py-32 border-t border-[#151515]/10">
      <div className="absolute top-0 right-0 -translate-y-1/2 md:translate-y-0 md:top-8 md:right-8 opacity-10 pointer-events-none">
        <span className="text-[12rem] lg:text-[20rem] font-bold leading-none tracking-tighter text-[#151515]">
          {num}
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
        {isFullWidth && (
          <>
            <div className="md:col-span-12 space-y-6">
              <h3 className="text-4xl lg:text-7xl font-bold uppercase tracking-tight text-[#151515]">
                {project.title}
              </h3>
              <div className="w-full h-[400px] lg:h-[700px] overflow-hidden bg-[#151515]/5">
                {project.image ? (
                  <ProjectImage src={project.image} alt={project.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#151515]/30 uppercase text-xl font-medium tracking-widest">Image Unavailable</div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <p className="text-lg lg:text-xl text-[#151515]/80 leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="space-y-6 md:pl-12">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#C85A3E] mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 border border-[#151515] text-[#151515] text-sm uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-6">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" data-cursor-text="VIEW" className="flex items-center gap-2 text-[#151515] font-semibold uppercase tracking-wider hover:text-[#C85A3E] transition-colors">
                        Live Site <HiArrowTopRightOnSquare className="text-xl" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#151515] font-semibold uppercase tracking-wider hover:text-[#C85A3E] transition-colors">
                        Repository <SiGithub className="text-xl" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {isSplit && (
          <>
            <div className="md:col-span-6 space-y-8 flex flex-col justify-center">
              <h3 className="text-4xl lg:text-6xl font-bold uppercase tracking-tight text-[#151515]">
                {project.title}
              </h3>
              <p className="text-lg text-[#151515]/80 leading-relaxed font-light">
                {project.description}
              </p>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#C85A3E] mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 border border-[#151515] text-[#151515] text-sm uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-6 pt-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#151515] font-semibold uppercase tracking-wider hover:text-[#C85A3E] transition-colors">
                    Live Site <HiArrowTopRightOnSquare className="text-xl" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#151515] font-semibold uppercase tracking-wider hover:text-[#C85A3E] transition-colors">
                    Repository <SiGithub className="text-xl" />
                  </a>
                )}
              </div>
            </div>
            <div className="md:col-span-6 h-[400px] lg:h-[600px] bg-[#151515]/5 overflow-hidden">
              {project.image ? (
                <ProjectImage src={project.image} alt={project.title} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#151515]/30 uppercase text-xl font-medium tracking-widest">Image Unavailable</div>
              )}
            </div>
          </>
        )}

        {isAsymmetrical && (
          <>
            <div className="md:col-span-4 md:order-last space-y-8">
              <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight text-[#151515]">
                {project.title}
              </h3>
              <p className="text-base text-[#151515]/80 leading-relaxed font-light">
                {project.description}
              </p>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#C85A3E] mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs font-bold uppercase tracking-widest text-[#151515]">
                      {tech} {`//`}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#151515] font-semibold uppercase tracking-wider hover:text-[#C85A3E] transition-colors">
                    Live Site <HiArrowTopRightOnSquare className="text-xl" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#151515] font-semibold uppercase tracking-wider hover:text-[#C85A3E] transition-colors">
                    Repository <SiGithub className="text-xl" />
                  </a>
                )}
              </div>
            </div>
            <div className="md:col-span-8 md:order-first h-[300px] lg:h-[500px] bg-[#151515]/5 overflow-hidden">
              {project.image ? (
                <ProjectImage src={project.image} alt={project.title} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#151515]/30 uppercase text-xl font-medium tracking-widest">Image Unavailable</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured);
  
  return (
    <section id="projects" className="bg-[#F4F0E8] text-[#151515] py-24 lg:py-48 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-6xl lg:text-[8rem] font-bold uppercase tracking-tighter leading-none mb-6 text-[#151515]">
            Selected <br/> Works.
          </h2>
          <p className="text-xl lg:text-3xl max-w-2xl font-light text-[#151515]/70">
            A curated collection of projects demonstrating expertise in frontend engineering, architectural design, and digital experiences.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <ProjectDisplay project={project} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
