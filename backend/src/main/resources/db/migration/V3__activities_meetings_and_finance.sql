CREATE TABLE activities (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL REFERENCES associations(id) ON DELETE RESTRICT,
    section_id UUID,
    title VARCHAR(180) NOT NULL,
    description TEXT,
    starts_at TIMESTAMP WITH TIME ZONE,
    location VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'PLANNED',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_activity_status CHECK (status IN ('PLANNED', 'COMPLETED', 'CANCELLED')),
    CONSTRAINT fk_activity_section_same_association FOREIGN KEY (section_id, association_id) REFERENCES sections(id, association_id) ON DELETE RESTRICT,
    CONSTRAINT uq_activities_id_association UNIQUE (id, association_id)
);
CREATE INDEX idx_activities_association_start ON activities(association_id, starts_at);

CREATE TABLE activity_proposals (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL,
    member_id UUID NOT NULL,
    title VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT ck_activity_proposal_status CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    CONSTRAINT fk_proposal_member_same_association FOREIGN KEY (member_id, association_id) REFERENCES members(id, association_id) ON DELETE RESTRICT
);
CREATE INDEX idx_activity_proposals_association_status ON activity_proposals(association_id, status);

CREATE TABLE activity_comments (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL,
    activity_id UUID NOT NULL,
    member_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_activity_same_association FOREIGN KEY (activity_id, association_id) REFERENCES activities(id, association_id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_member_same_association FOREIGN KEY (member_id, association_id) REFERENCES members(id, association_id) ON DELETE RESTRICT
);
CREATE INDEX idx_activity_comments_activity_created ON activity_comments(activity_id, created_at);

CREATE TABLE meeting_announcements (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL REFERENCES associations(id) ON DELETE RESTRICT,
    section_id UUID,
    title VARCHAR(180) NOT NULL,
    agenda TEXT,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_meeting_section_same_association FOREIGN KEY (section_id, association_id) REFERENCES sections(id, association_id) ON DELETE RESTRICT
);
CREATE INDEX idx_meetings_association_start ON meeting_announcements(association_id, starts_at);

CREATE TABLE fundraising_campaigns (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL REFERENCES associations(id) ON DELETE RESTRICT,
    title VARCHAR(180) NOT NULL,
    description TEXT,
    target_amount NUMERIC(12,2) NOT NULL,
    currency CHAR(3) NOT NULL,
    ends_on DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_campaign_target_amount CHECK (target_amount > 0),
    CONSTRAINT ck_campaign_status CHECK (status IN ('OPEN', 'CLOSED', 'COMPLETED')),
    CONSTRAINT uq_campaigns_id_association UNIQUE (id, association_id)
);
CREATE INDEX idx_campaigns_association_status ON fundraising_campaigns(association_id, status);

CREATE TABLE contributions (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL,
    member_id UUID NOT NULL,
    campaign_id UUID,
    type VARCHAR(20) NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    currency CHAR(3) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_provider VARCHAR(40),
    provider_reference VARCHAR(200),
    idempotency_key VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT ck_contribution_amount CHECK (amount > 0),
    CONSTRAINT ck_contribution_type CHECK (type IN ('MEMBERSHIP_DUES', 'FUNDRAISING')),
    CONSTRAINT ck_contribution_status CHECK (status IN ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED')),
    CONSTRAINT ck_contribution_campaign CHECK ((type = 'FUNDRAISING' AND campaign_id IS NOT NULL) OR (type = 'MEMBERSHIP_DUES' AND campaign_id IS NULL)),
    CONSTRAINT fk_contribution_member_same_association FOREIGN KEY (member_id, association_id) REFERENCES members(id, association_id) ON DELETE RESTRICT,
    CONSTRAINT fk_contribution_campaign_same_association FOREIGN KEY (campaign_id, association_id) REFERENCES fundraising_campaigns(id, association_id) ON DELETE RESTRICT
);
CREATE INDEX idx_contributions_member_status ON contributions(member_id, status);
CREATE INDEX idx_contributions_campaign_status ON contributions(campaign_id, status);
CREATE INDEX idx_contributions_association_created ON contributions(association_id, created_at);
