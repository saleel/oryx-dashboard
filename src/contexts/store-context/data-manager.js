import axios from 'axios';

class DataManager {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:5000',
    });

    this.findEntities = this.findEntities.bind(this);
    this.getSchema = this.getSchema.bind(this);
    this.findSchemas = this.findSchemas.bind(this);
    this.createEntity = this.createEntity.bind(this);
    this.createSchema = this.createSchema.bind(this);
  }

  async getSchema(schemaId) {
    const response = await this.axios.get(`/schemas/${schemaId}`);
    return response.data;
  }

  async createSchema(data) {
    const response = await this.axios.post('/schemas/', data);
    return response.data;
  }

  async findSchemas() {
    const response = await this.axios.get('/schemas');
    return response.data;
  }

  async findEntities({ schemaId, ...rest }) {
    const response = await this.axios.get(`/${schemaId}`, { params: rest });
    return response.data;
  }

  async createEntity({ schemaId, data }) {
    const response = await this.axios.post(`/${schemaId}`, data);
    return response.data;
  }
}

export default DataManager;
