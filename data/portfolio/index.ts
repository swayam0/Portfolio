import { profile } from './profile';
import { projects } from './projects';
import { skills } from './skills';
import { experience } from './experience';

export { profile, projects, skills, experience };

export function getProfileSummary() {
  return profile;
}

export function searchProjects(query?: string, technologies?: string[]) {
  let filtered = projects;
  
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (technologies && technologies.length > 0) {
    const techLower = technologies.map(t => t.toLowerCase());
    filtered = filtered.filter(p => 
      p.stack.some(s => techLower.includes(s.toLowerCase()))
    );
  }

  return filtered;
}

export function getProjectDetails(projectId: string) {
  return projects.find(p => p.id === projectId) || null;
}

export function getSkills(category?: string) {
  if (category) {
    const q = category.toLowerCase();
    return skills.filter(s => s.name.toLowerCase().includes(q));
  }
  return skills;
}

export function getExperience() {
  return experience;
}

export function getResumeLink() {
  return profile.links.resume;
}

export function getContactActions() {
  return [
    { label: "Email", href: `mailto:${profile.email}`, type: "email" },
    { label: "LinkedIn", href: profile.links.linkedin, type: "link" },
    { label: "Contact Form", href: "#contact", type: "anchor" }
  ];
}

// Function to gather all verified data for deterministic / LLM context
export function getAllPortfolioData() {
  return {
    profile,
    projects,
    skills,
    experience
  };
}
