#!/bin/bash

# this script sets the connection string in an app service
#

# Grab command line arguments
#
servicePrincipal=$1
servicePrincipalTenant=$2
servicePrincipalSecret=$3
azureSubscriptionName=$4
resourceGroup=$5
appService=$6
connectionStringType=$7
connectionString=$8
connectionStringName=$9

echo "servicePrincipal: $servicePrincipal"
echo "servicePrincipalTenat: $servicePrincipalTenant"
echo "servicePrincipalSecret: $servicePrincipalSecret"
echo "azureSubcriptionName: $azureSubscriptionName"
echo "resourceGroup: $resourceGroup"
echo "appService: $appService"
echo "connectionStringType: $connectionStringType"
echo "connectionString: $connectionString"
echo "connectionStringName: $connectionStringName"
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

echo "Setting connection string.."
az webapp config connection-string set \
    --name $webAppName \
    --connection-string-type "SQLAzure" \
    --resource-group $resourceGroupName \
    --settings $connectionStringName="$connectionString"
