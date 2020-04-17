import axios from 'axios';

class DataManager {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:5000',
    });

    this.findEntities = this.findEntities.bind(this);
    this.getEntity = this.getEntity.bind(this);
    this.createEntity = this.createEntity.bind(this);
    this.findItems = this.findItems.bind(this);
    this.createItem = this.createItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  async getEntity(entityId) {
    const response = await this.axios.get(`/entities/${entityId}`);
    return response.data;
  }

  async createEntity(data) {
    const response = await this.axios.post('/entities/', data);
    return response.data;
  }

  async findEntities() {
    const response = await this.axios.get('/entities');
    return response.data;
  }

  async findItems({ entityId, ...rest }) {
    const response = await this.axios.get(`/${entityId}`, { params: rest });
    return response.data;
  }

  async createItem({ entityId, data }) {
    const response = await this.axios.post(`/${entityId}`, data);
    return response.data;
  }

  async getItem({ entityId, itemId }) {
    const response = await this.axios.get(`/${entityId}/${itemId}`);
    return response.data;
  }

  async updateItem({ entityId, itemId, data }) {
    const response = await this.axios.patch(`/${entityId}/${itemId}`, data);
    return response.data;
  }
}

export default DataManager;
