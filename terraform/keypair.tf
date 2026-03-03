resource "aws_key_pair" "deployer" {
  key_name   = "three-tier-key"
  public_key = file("${path.module}/three-tier-key.pub")
}
