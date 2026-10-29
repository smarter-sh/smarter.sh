#------------------------------------------------------------------------------
# usage:  email for @smarter.sh - Terraform and provider versions.
#
#         State is in the private terraform.smarter.sh bucket (us-east-2),
#         which was created by hand. It holds the SMTP password. Both the
#         backend and the provider use the AWS profile "lawrence"; a backend
#         block can't read variables, so the profile is spelled out here and
#         in var.aws_profile. See ../README.md.
#------------------------------------------------------------------------------

terraform {
  required_version = ">= 1.10"

  backend "s3" {
    bucket       = "terraform.smarter.sh"
    key          = "mail/terraform.tfstate"
    region       = "us-east-2"
    profile      = "lawrence"
    encrypt      = true
    use_lockfile = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.40"
    }
    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.4"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Terraform = "true"
      Smarter   = "true"
      Purpose   = "smarter.sh email"
      Source    = "github.com/smarter-sh/smarter.sh/mail"
    }
  }
}

data "aws_caller_identity" "current" {}

locals {
  account_id        = data.aws_caller_identity.current.account_id
  name              = replace(var.domain, ".", "-")
  forwarder_address = "${var.forwarder_local_part}@${var.domain}"
  rule_set_name     = "${local.name}-inbound"
  rule_name         = "${local.name}-forward"
  mail_prefix       = "inbox/"

  # SES checks this arn when it writes to the bucket and invokes the function.
  receipt_rule_arn = "arn:aws:ses:${var.aws_region}:${local.account_id}:receipt-rule-set/${local.rule_set_name}:receipt-rule/${local.rule_name}"
}
