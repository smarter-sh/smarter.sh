#------------------------------------------------------------------------------
# usage:  email for @smarter.sh - the bucket SES saves each received message
#         to, as a raw MIME file under inbox/<SES message id>.
#------------------------------------------------------------------------------

resource "aws_s3_bucket" "mail" {
  bucket_prefix = "${local.name}-inbound-mail-"
}

resource "aws_s3_bucket_ownership_controls" "mail" {
  bucket = aws_s3_bucket.mail.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "mail" {
  bucket                  = aws_s3_bucket.mail.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_lifecycle_configuration" "mail" {
  bucket = aws_s3_bucket.mail.id

  rule {
    id     = "expire-received-mail"
    status = "Enabled"

    filter {
      prefix = local.mail_prefix
    }

    expiration {
      days = var.retention_days
    }
  }
}

# Only this account's receipt rule may write here.
data "aws_iam_policy_document" "mail_bucket" {
  statement {
    sid       = "AllowSESPuts"
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.mail.arn}/${local.mail_prefix}*"]

    principals {
      type        = "Service"
      identifiers = ["ses.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [local.account_id]
    }

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = [local.receipt_rule_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "mail" {
  bucket = aws_s3_bucket.mail.id
  policy = data.aws_iam_policy_document.mail_bucket.json

  depends_on = [aws_s3_bucket_public_access_block.mail]
}
