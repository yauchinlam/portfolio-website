terraform {
  required_version = ">= 1.5.0"

  # Remote state for CI/CD — configure at init via GitHub Actions backend-config (see README).
  backend "azurerm" {}

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
}
