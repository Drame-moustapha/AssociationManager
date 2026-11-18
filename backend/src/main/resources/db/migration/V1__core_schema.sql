CREATE TABLE associations (
    id UUID PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    description TEXT,
    email VARCHAR(254),
    phone VARCHAR(40),
    address VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_associations_name UNIQUE (name)
);

CREATE TABLE members (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL REFERENCES associations(id) ON DELETE RESTRICT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(40),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    joined_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_member_email_per_association UNIQUE (association_id, email),
    CONSTRAINT ck_member_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED'))
);

CREATE INDEX idx_members_association_id ON members(association_id);
CREATE INDEX idx_members_last_name ON members(last_name);
