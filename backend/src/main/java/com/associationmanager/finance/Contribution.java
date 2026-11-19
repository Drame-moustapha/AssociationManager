package com.associationmanager.finance;

import com.associationmanager.membership.Member;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "contributions")
public class Contribution {
    @Id private UUID id;
    @Column(name = "association_id", nullable = false) private UUID associationId;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false) private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id") private FundraisingCampaign campaign;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20) private ContributionType type;
    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal amount;
    @Column(nullable = false, length = 3) private String currency;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20) private PaymentStatus status;
    @Column(name = "payment_provider", length = 40) private String paymentProvider;
    @Column(name = "provider_reference", length = 200) private String providerReference;
    @Column(name = "idempotency_key", nullable = false, length = 100, unique = true) private String idempotencyKey;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false) private OffsetDateTime createdAt;
    @Column(name = "paid_at") private OffsetDateTime paidAt;

    protected Contribution() {}
    public Contribution(UUID associationId, Member member, FundraisingCampaign campaign,
                        ContributionType type, BigDecimal amount, String currency, String idempotencyKey) {
        if (type == ContributionType.FUNDRAISING && campaign == null) throw new IllegalArgumentException("Une contribution à une cagnotte doit référencer une campagne.");
        if (type == ContributionType.MEMBERSHIP_DUES && campaign != null) throw new IllegalArgumentException("Une cotisation ne doit pas référencer une campagne de cagnotte.");
        this.id = UUID.randomUUID(); this.associationId = associationId; this.member = member;
        this.campaign = campaign; this.type = type; this.amount = amount;
        this.currency = currency.toUpperCase(java.util.Locale.ROOT); this.idempotencyKey = idempotencyKey;
        this.status = PaymentStatus.PENDING;
    }
    public UUID getId() { return id; }
    public UUID getAssociationId() { return associationId; }
    public Member getMember() { return member; }
    public FundraisingCampaign getCampaign() { return campaign; }
    public ContributionType getType() { return type; }
    public BigDecimal getAmount() { return amount; }
    public String getCurrency() { return currency; }
    public PaymentStatus getStatus() { return status; }
    public String getPaymentProvider() { return paymentProvider; }
    public String getProviderReference() { return providerReference; }
    public String getIdempotencyKey() { return idempotencyKey; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getPaidAt() { return paidAt; }
}
