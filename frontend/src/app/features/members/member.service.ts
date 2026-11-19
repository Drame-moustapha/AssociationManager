import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

export type MemberStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export interface Member { id: string; firstName: string; lastName: string; email: string; phone: string | null; status: MemberStatus; joinedAt: string; }
export interface MemberPayload { firstName: string; lastName: string; email: string; phone: string; status: MemberStatus; joinedAt: string; }

@Injectable({ providedIn: 'root' })
export class MemberService {
  private readonly api = inject(ApiService);
  list(associationId: string) { return this.api.get<Member[]>(`/associations/${associationId}/members`); }
  create(associationId: string, payload: MemberPayload) { return this.api.post<Member>(`/associations/${associationId}/members`, payload); }
  update(associationId: string, memberId: string, payload: MemberPayload) { return this.api.put<Member>(`/associations/${associationId}/members/${memberId}`, payload); }
  delete(associationId: string, memberId: string) { return this.api.delete<void>(`/associations/${associationId}/members/${memberId}`); }
}
