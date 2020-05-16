import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  appendHtmlElementToHead,
  getProjectFromWorkspace,
  getProjectIndexFiles,
} from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Add payment pointer to index.html.
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const projectIndexFiles = getProjectIndexFiles(project);

    if (!projectIndexFiles.length) {
      throw new SchematicsException(
        'No project index HTML file could be found.'
      );
    }

    projectIndexFiles.forEach((indexFilePath) => {
      appendHtmlElementToHead(
        tree,
        indexFilePath,
        `<meta name="monetization" content="${options.paymentPointer}">`
      );
    });

    // Install the package.
    _context.addTask(new NodePackageInstallTask());

    return tree;
  };
}
