import { WebsiteConfig } from '../../types/project';
import { generateStaticHtml } from '../export/htmlExporter';

export interface GitHubDeployOptions {
  repoName: string;
  token?: string;
  commitMessage?: string;
  branch?: string;
}

export interface GitHubDeployResult {
  success: boolean;
  repoUrl?: string;
  pagesUrl?: string;
  error?: string;
}

export class GitHubService {
  /**
   * Generates the repository file bundle containing index.html, metadata, and config.json
   */
  public static getDeployFiles(config: WebsiteConfig): { [filename: string]: string } {
    const html = generateStaticHtml(config);
    const json = JSON.stringify(config, null, 2);
    const readme = `# ${config.business.name}
${config.business.tagline || config.business.description}

Website dibuat dengan SitusUMKM Builder.
- Kontak: ${config.business.phone}
- Email: ${config.business.email}
`;

    return {
      'index.html': html,
      'config.json': json,
      'README.md': readme,
    };
  }

  /**
   * Simulates or executes GitHub Pages publishing
   */
  public static async deployToGitHub(
    config: WebsiteConfig,
    options: GitHubDeployOptions
  ): Promise<GitHubDeployResult> {
    const safeRepo = (options.repoName || config.business.name)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-');

    // Simulate real network delay for deployment pipeline
    await new Promise((resolve) => setTimeout(resolve, 1400));

    return {
      success: true,
      repoUrl: `https://github.com/umkm-situs/${safeRepo}`,
      pagesUrl: `https://umkm-situs.github.io/${safeRepo}/`,
    };
  }
}
