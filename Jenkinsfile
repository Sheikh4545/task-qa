pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Build Docker image') {
            steps {
                bat 'docker build -t playwright-tests:%BUILD_NUMBER% .'
            }
        }

        stage('Run Playwright tests') {
            steps {
                withCredentials([file(credentialsId: 'playwright-env', variable: 'ENV_FILE')]) {
                    bat '''
@echo off
set "TEST_EXIT_CODE=0"
set "COPY_EXIT_CODE=0"
docker rm -f playwright-tests-%BUILD_NUMBER% >nul 2>&1
docker run --name playwright-tests-%BUILD_NUMBER% --env-file "%ENV_FILE%" playwright-tests:%BUILD_NUMBER% npx playwright test --project=chromium
set "TEST_EXIT_CODE=%ERRORLEVEL%"
if exist "playwright-report" rmdir /s /q "playwright-report"
if exist "allure-results" rmdir /s /q "allure-results"
docker cp "playwright-tests-%BUILD_NUMBER%:/app/playwright-report" "."
if errorlevel 1 set "COPY_EXIT_CODE=1"
docker cp "playwright-tests-%BUILD_NUMBER%:/app/allure-results" "."
if errorlevel 1 set "COPY_EXIT_CODE=1"
docker rm "playwright-tests-%BUILD_NUMBER%" >nul 2>&1
if not "%TEST_EXIT_CODE%"=="0" exit /b %TEST_EXIT_CODE%
if not "%COPY_EXIT_CODE%"=="0" exit /b 1
'''
                }
            }
        }
    }

    post {
        always {
            script {
                def cleanupStatus = bat(
                    returnStatus: true,
                    script: 'docker rm -f playwright-tests-%BUILD_NUMBER% >nul 2>&1'
                )
                if (cleanupStatus != 0) {
                    echo 'Container cleanup returned a non-zero status; it may already be removed.'
                }
            }
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}
