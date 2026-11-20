import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

export interface Association { id: string; name: string; description: string | null; email: string | null; phone: string | null; address: string | null; }
export interface AssociationPayload { name: string; description: string; email: string; phone: string; address: string; }

@Injectable({ providedIn: 'root' })
export class AssociationService {
  private readonly api = inject(ApiService);
  list() { return this.api.get<Association[]>('/associations'); }
  create(payload: AssociationPayload) { return this.api.post<Association>('/associations', payload); }
  update(id: string, payload: AssociationPayload) { return this.api.put<Association>(`/associations/${id}`, payload); }
  delete(id: string) { return this.api.delete<void>(`/associations/${id}`); }
}
