#------------------------------------------------------------------------------
# usage:  email for @smarter.sh - Route53 records.
#
#         These are records at the apex and at _dmarc. ubc.smarter.sh's own
#         records, including its DMARC policy, are separate names and are not
#         changed.
#------------------------------------------------------------------------------

data "aws_route53_zone" "domain" {
  name         = var.domain
  private_zone = false
}

resource "aws_route53_record" "mx" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = var.domain
  type    = "MX"
  ttl     = 3600
  records = ["10 inbound-smtp.${var.aws_region}.amazonaws.com"]
}

# Route53 keeps all apex TXT values in one record set, so this record also
# carries the values in var.apex_txt_records. allow_overwrite adopts the record
# that already exists.
resource "aws_route53_record" "apex_txt" {
  zone_id         = data.aws_route53_zone.domain.zone_id
  name            = var.domain
  type            = "TXT"
  ttl             = 3600
  allow_overwrite = true
  records         = concat(var.apex_txt_records, ["v=spf1 include:amazonses.com ~all"])
}

resource "aws_route53_record" "dmarc" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "_dmarc.${var.domain}"
  type    = "TXT"
  ttl     = 3600
  records = ["v=DMARC1; p=${var.dmarc_policy}; rua=mailto:${var.dmarc_local_part}@${var.domain}"]
}

# Easy DKIM: SES signs with the keys these three records publish.
resource "aws_route53_record" "dkim" {
  count   = 3
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${var.domain}"
  type    = "CNAME"
  ttl     = 3600
  records = ["${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"]
}
