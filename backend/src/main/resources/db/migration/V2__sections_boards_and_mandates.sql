CREATE TABLE sections (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL REFERENCES associations(id) ON DELETE RESTRICT,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_section_name_per_association UNIQUE (association_id, name),
    CONSTRAINT uq_sections_id_association UNIQUE (id, association_id)
);
CREATE INDEX idx_sections_association_id ON sections(association_id);

CREATE TABLE boards (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL REFERENCES associations(id) ON DELETE RESTRICT,
    section_id UUID,
    type VARCHAR(20) NOT NULL,
    name VARCHAR(160) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_board_type CHECK (type IN ('MAIN', 'SECTION')),
    CONSTRAINT ck_board_section_scope CHECK ((type = 'MAIN' AND section_id IS NULL) OR (type = 'SECTION' AND section_id IS NOT NULL)),
    CONSTRAINT fk_board_section_same_association FOREIGN KEY (section_id, association_id) REFERENCES sections(id, association_id) ON DELETE RESTRICT,
    CONSTRAINT uq_boards_id_association UNIQUE (id, association_id)
);
CREATE UNIQUE INDEX uq_one_main_board_per_association ON boards(association_id) WHERE type = 'MAIN';
CREATE UNIQUE INDEX uq_one_board_per_section ON boards(section_id) WHERE type = 'SECTION';

CREATE TABLE board_mandates (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL,
    board_id UUID NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_board_mandate_dates CHECK (end_date >= start_date),
    CONSTRAINT fk_mandate_board_same_association FOREIGN KEY (board_id, association_id) REFERENCES boards(id, association_id) ON DELETE RESTRICT,
    CONSTRAINT uq_board_mandates_id_association UNIQUE (id, association_id)
);

ALTER TABLE members ADD CONSTRAINT uq_members_id_association UNIQUE (id, association_id);

CREATE TABLE board_members (
    id UUID PRIMARY KEY,
    association_id UUID NOT NULL,
    mandate_id UUID NOT NULL,
    member_id UUID NOT NULL,
    title VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_board_member_mandate_same_association FOREIGN KEY (mandate_id, association_id) REFERENCES board_mandates(id, association_id) ON DELETE RESTRICT,
    CONSTRAINT fk_board_member_member_same_association FOREIGN KEY (member_id, association_id) REFERENCES members(id, association_id) ON DELETE RESTRICT,
    CONSTRAINT uq_member_once_per_mandate UNIQUE (mandate_id, member_id)
);
