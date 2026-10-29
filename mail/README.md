# Email for @smarter.sh

Receives mail for every address at smarter.sh and forwards it to the inboxes you choose.
Replies go out from @smarter.sh through SES SMTP. It costs about $0.10 per 1,000 messages
received; S3, Lambda and CloudWatch at this volume stay within the free tier or cost cents.

```text
sender ──MX──▶ SES (receipt rule) ──▶ S3  inbox/<message id>
                                  └─▶ Lambda forwarder ──SES──▶ your inbox
```

- [forwarder/index.js](forwarder/index.js) is the Lambda function. It reads the message from
  S3, changes `From` to `"<sender> via smarter.sh" <forwarder@smarter.sh>`, keeps the sender
  in `Reply-To`, drops the original `DKIM-Signature`, `Return-Path`, `Sender` and
  `Message-ID`, and sends it with SES. The `From` has to change: SES only sends from
  verified identities, and the original `From` would fail the sender's DMARC check at
  your inbox. Spam, viruses and mail to the forwarder address (bounces) are kept in S3 and
  not forwarded. Its tests run with `yarn test`.
- [terraform/](terraform/) creates the SES identity for smarter.sh with Easy DKIM, the
  Route53 records (MX, SPF, DMARC, DKIM), the bucket, the function, the active receipt rule
  set, and an IAM user for SES SMTP.

ubc.smarter.sh's SES identity and records are separate (smarter-infrastructure) and are not
changed. Its DMARC record sends reports to `my_dmarc_report@smarter.sh`; this setup is
what lets them arrive.

## Deploy

Requires Terraform 1.10 or later and the AWS profile `lawrence` (set in `providers.tf` and
`variables.tf`). State is in the
private `terraform.smarter.sh` bucket (us-east-2), key `mail/terraform.tfstate`, locked
with S3's lock file. The state holds the SMTP password, so keep the bucket private, and
turn on versioning so a bad apply can be rolled back.

```console
cd mail/terraform
terraform init
terraform plan
terraform apply
```

Check before you apply:

- **Region.** `aws_region` must have SES email receiving (us-east-1 does). The MX record
  points at `inbound-smtp.<region>.amazonaws.com`.
- **The active rule set.** A region has one active receipt rule set. If one is already
  active in that region, applying this replaces it: `aws ses describe-active-receipt-rule-set`.
- **The apex TXT record.** Route53 keeps every apex TXT value in one record, so this module
  owns it. Add any value you put there by hand to `apex_txt_records`, or the next apply
  removes it.
- **An existing identity.** If smarter.sh is already an SES identity in that region,
  import it: `terraform import aws_sesv2_email_identity.domain smarter.sh`.
- **The SES sandbox.** In the sandbox, SES only sends to verified addresses. Either request
  production access, or verify each `forward_to` address.

## Send from Gmail as `you@smarter.sh`

Gmail → Settings → Accounts → **Send mail as** → Add another email address. Uncheck "Treat
as an alias" if you want replies to show your @smarter.sh address. Then:

| Field    | Value                                       |
| -------- | ------------------------------------------- |
| SMTP     | `terraform output smtp_host`, port 587, TLS |
| Username | `terraform output smtp_username`            |
| Password | `terraform output -raw smtp_password`       |

Gmail sends a confirmation code to the address, which arrives through the forwarder. In
Gmail's settings, choose "Reply from the same address the message was sent to".

## Checking it

- Send a message to any @smarter.sh address. It should arrive within a minute.
- The function's log group is `/aws/lambda/smarter-sh-mail-forwarder`. Each message logs
  one line with its SES message id: forwarded, dropped (spam or virus) or kept (forwarder
  address).
- Every received message is in the bucket under `inbox/` for `retention_days` (90).
- Once DMARC reports show that SES and your other senders pass, raise `dmarc_policy` to
  `quarantine`.
