#------------------------------------------------------------------------------
# usage:  email for @smarter.sh - inputs. Set the required ones in
#         terraform.tfvars (gitignored); see terraform.tfvars.example.
#------------------------------------------------------------------------------

variable "aws_profile" {
  description = "The AWS profile (~/.aws/config) that Terraform runs as. The backend block in providers.tf names it too."
  type        = string
  default     = "lawrence"
}

variable "aws_region" {
  description = "Where SES receives mail. It must be a region with SES email receiving; the MX record points at inbound-smtp.<region>.amazonaws.com."
  type        = string
  default     = "us-east-1"
}

variable "domain" {
  description = "The domain that receives mail. Its Route53 hosted zone must exist."
  type        = string
  default     = "smarter.sh"
}

variable "forward_to" {
  description = "The inboxes every message for @<domain> is forwarded to."
  type        = list(string)
  default     = ["lpm0073@gmail.com"]
}

variable "forwarder_local_part" {
  description = "Forwarded mail is sent from <this>@<domain>. Mail to this address (bounces) is kept in S3 and not forwarded."
  type        = string
  default     = "forwarder"
}

variable "dmarc_local_part" {
  description = "DMARC aggregate reports for <domain> go to <this>@<domain>."
  type        = string
  default     = "dmarc"
}

variable "dmarc_policy" {
  description = "The root domain's DMARC policy: none while reports are reviewed, then quarantine or reject."
  type        = string
  default     = "none"

  validation {
    condition     = contains(["none", "quarantine", "reject"], var.dmarc_policy)
    error_message = "dmarc_policy is none, quarantine or reject."
  }
}

variable "apex_txt_records" {
  description = "The domain's other apex TXT values. Route53 holds every apex TXT value in one record, so this module owns it, and the SPF value is added to these."
  type        = list(string)
  default = [
    "google-site-verification=U2uJFs7O4_p9M8k2SY7_OPXEPPfpbPx5Ve9zmbVNplI",
  ]
}

variable "retention_days" {
  description = "Days that received messages stay in S3."
  type        = number
  default     = 90
}

variable "create_smtp_user" {
  description = "Create an IAM user whose SES SMTP credentials let a mail client (e.g. Gmail's Send mail as) send from @<domain>."
  type        = bool
  default     = true
}
