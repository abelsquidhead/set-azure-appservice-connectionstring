#!/bin/bash

# this script sets the connection string in an app service
#

# Grab command line arguments
#
servicePrincipal=$1
servicePrincipalTenant=$2
servicePrincipalSecret=$3
azureSubscriptionName=$4

echo "servicePrincipal: $servicePrincipal"
echo "servicePrincipalTenat: $servicePrincipalTenant"
echo "servicePrincipalSecret: $servicePrincipalSecret"
echo "azureSubcriptionName: $azureSubscriptionName"
echo ""



# this logs into azure using service principal
#
echo "Logging in to Azure with a service principal..."
az login \
    --service-principal \
    --username $servicePrincipal \
    --password $servicePrincipalSecret \
    --tenant $servicePrincipalTenant
echo "Done logging in to Azure"
echo ""



# This sets the default subscription
#
echo "Setting default azure subscription..."
az account set \
    --subscription $azureSubscriptionName
echo "Done setting default subscription"
echo ""

# # This creates the resource group used to house this application
# #
# echo "Creating resource group $IAC_EXCLUSIVE_RESOURCEGROUPNAME in region $IAC_RESOURCEGROUPREGION"
# az group create \
#     --name $IAC_EXCLUSIVE_RESOURCEGROUPNAME \
#     --location $IAC_RESOURCEGROUPREGION
# echo "Done creating resource group"
# echo ""