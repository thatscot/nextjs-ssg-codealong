terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.63.0"
    }
  }
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_amplify_app" "next-boiler-plate" {
  name         = "next-boiler-plate"
  repository   = "https://gitlab.com/ANDigital/next-boiler-plate"
  access_token = var.access_token

  enable_branch_auto_build    = true
  enable_auto_branch_creation = true
  auto_branch_creation_config {
    enable_auto_build = true
  }

  build_spec = <<-EOT
    version: 0.1
    frontend:
      phases:
        preBuild:
          commands:
            - yarn install
        build:
          commands:
            - yarn run build
      artifacts:
        baseDirectory: out
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }
}


resource "aws_amplify_branch" "main" {
  app_id                      = aws_amplify_app.next-boiler-plate.id
  branch_name                 = "main"
  enable_pull_request_preview = true
}

resource "aws_amplify_branch" "develop" {
  app_id                      = aws_amplify_app.next-boiler-plate.id
  branch_name                 = "develop"
  enable_pull_request_preview = true
}