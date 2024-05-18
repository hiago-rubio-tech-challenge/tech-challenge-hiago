import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { readFileSync } from "fs";

interface SwaggerDocument {
  openapi: string;
  info: any;
  servers?: any[];
  tags?: any[];
  paths: any;
  components?: any;
}
export function combineSwaggerDocuments(files: string[]): SwaggerDocument {
  const combinedDocument: SwaggerDocument = JSON.parse(
    readFileSync(files[0], "utf8")
  );

  for (let i = 1; i < files.length; i++) {
    const currentDocument: SwaggerDocument = JSON.parse(
      readFileSync(files[i], "utf8")
    );

    // Junte os caminhos
    Object.assign(combinedDocument.paths, currentDocument.paths);

    // Junte os componentes (se existirem)
    if (currentDocument.components) {
      if (!combinedDocument.components) {
        combinedDocument.components = {};
      }
      if (!combinedDocument.components.schemas) {
        combinedDocument.components.schemas = {};
      }
      Object.assign(
        combinedDocument.components.schemas,
        currentDocument.components.schemas
      );
    }

    // Junte as tags (se existirem)
    if (currentDocument.tags) {
      if (!combinedDocument.tags) {
        combinedDocument.tags = [];
      }
      combinedDocument.tags.push(...currentDocument.tags);
    }
  }

  return combinedDocument;
}

export function swaggerSetup(app: Express): void {
  const options = {
    explorer: true,
  };

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(
      combineSwaggerDocuments([
        "src/admin/application/adapters/in/docs/swagger.json",
        "src/pedido/application/adapters/in/docs/swagger.json",
      ]),
      options
    )
  );
}
