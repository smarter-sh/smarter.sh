#------------------------------------------------------------------------------
# usage:  email for @smarter.sh - the function that forwards each received
#         message (../forwarder/index.js).
#------------------------------------------------------------------------------

# The runtime includes the AWS SDK v3, so the zip holds only the function and
# its package.json (which makes index.js an ES module).
data "archive_file" "forwarder" {
  type        = "zip"
  source_dir  = "${path.module}/../forwarder"
  output_path = "${path.module}/.build/forwarder.zip"
  excludes    = ["index.test.js"]
}

resource "aws_cloudwatch_log_group" "forwarder" {
  name              = "/aws/lambda/${local.name}-mail-forwarder"
  retention_in_days = 30
}

resource "aws_lambda_function" "forwarder" {
  function_name    = "${local.name}-mail-forwarder"
  description      = "Forwards mail received for @${var.domain}"
  role             = aws_iam_role.forwarder.arn
  runtime          = "nodejs22.x"
  handler          = "index.handler"
  filename         = data.archive_file.forwarder.output_path
  source_code_hash = data.archive_file.forwarder.output_base64sha256
  timeout          = 30

  # SES accepts messages up to 40 MB, and the function holds a few copies.
  memory_size = 512

  environment {
    variables = {
      FORWARD_TO        = join(",", var.forward_to)
      FORWARDER_ADDRESS = local.forwarder_address
      MAIL_BUCKET       = aws_s3_bucket.mail.id
      MAIL_PREFIX       = local.mail_prefix
      FORWARD_LABEL     = var.domain
    }
  }

  depends_on = [aws_cloudwatch_log_group.forwarder]
}

resource "aws_lambda_permission" "ses" {
  statement_id   = "AllowSESInvoke"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.forwarder.function_name
  principal      = "ses.amazonaws.com"
  source_account = local.account_id
  source_arn     = local.receipt_rule_arn
}

data "aws_iam_policy_document" "forwarder_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "forwarder" {
  name_prefix        = "${local.name}-mail-forwarder-"
  assume_role_policy = data.aws_iam_policy_document.forwarder_assume.json
}

resource "aws_iam_role_policy_attachment" "forwarder_logs" {
  role       = aws_iam_role.forwarder.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Read received messages, and send only as the forwarder address.
data "aws_iam_policy_document" "forwarder" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.mail.arn}/${local.mail_prefix}*"]
  }

  statement {
    actions   = ["ses:SendRawEmail"]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "ses:FromAddress"
      values   = [local.forwarder_address]
    }
  }
}

resource "aws_iam_role_policy" "forwarder" {
  name   = "read-and-forward-mail"
  role   = aws_iam_role.forwarder.id
  policy = data.aws_iam_policy_document.forwarder.json
}
