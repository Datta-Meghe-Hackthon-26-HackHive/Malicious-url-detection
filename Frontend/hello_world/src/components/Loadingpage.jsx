/* global chrome */
import React, { useState, useEffect } from 'react';

export default function LoadingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [scanResult, setScanResult] = useState(null);
    const params = new URLSearchParams(window.location.search);
    const targetUrl = params.get('url');
    useEffect(() => {
        
        // Make POST request to your backend
        fetch('http://127.0.0.1:8000/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: targetUrl })
        })
            .then(response => response.json())
            .then(data => {
                setScanResult(data);
                setIsLoading(false);
                console.log(scanResult)
            })
            .catch(error => {
                console.error('Error:', error);
                setScanResult({ error: 'Failed to scan URL' });
                setIsLoading(false);
            });
    }, [targetUrl]);

    function goToWebsite() {

        if (window.chrome && chrome.runtime) {
            return chrome.runtime.sendMessage({
                action: "bypassOnce",
                targetUrl: targetUrl   // ✅ correct key
            });
        }
        return window.location.href = targetUrl
    }
    // Loading Screen
    if (isLoading) {
        return (
            <div style={styles.container}>
                <div style={styles.content}>

                    {/* Animated Shield Icon */}
                    <div style={styles.iconWrapper}>
                        <div style={styles.iconContainer}>
                            <div style={styles.pingCircle}></div>
                            <div style={styles.iconCircle}>
                                <h1 style={styles.scanText}>Scanning the url</h1>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 style={styles.title}>
                        Loading...
                    </h1>

                    {/* Animated Dots */}
                    <div style={styles.dotsContainer}>
                        <div style={{ ...styles.dot, animationDelay: '0ms' }}></div>
                        <div style={{ ...styles.dot, animationDelay: '150ms' }}></div>
                        <div style={{ ...styles.dot, animationDelay: '300ms' }}></div>
                    </div>

                    <style>{`
                        @keyframes ping {
                            75%, 100% {
                                transform: scale(2);
                                opacity: 0;
                            }
                        }
                        
                        @keyframes bounce {
                            0%, 100% {
                                transform: translateY(-25%);
                                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                            }
                            50% {
                                transform: translateY(0);
                                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                            }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    // Results Screen
    return (
        <div style={styles.container}>
            <div style={styles.resultsContent}>

                {/* Results Card */}
                <div style={styles.resultsCard}>
                    <h1 style={styles.resultsTitle}>Scan Complete!</h1>

                    {/* Display your scan results here */}
                    <div style={styles.resultsBox}>
                        <h2 style={styles.resultsTitle}>Results</h2>
                    </div>

                    {/* Content Analysis Section */}
                    {scanResult.content && (
                        <div style={styles.sectionBox}>
                            <div style={styles.sectionTitle}>🔍 Content Analysis</div>
                            {/* <div style={styles.infoRow}> */}
                                {/* <span style={styles.infoLabel}>Risk Score:</span> */}
                                {/* <span style={styles.infoValue}> */}
                                    {/* {(scanResult.content.risk * 100).toFixed(1)}% */}
                                {/* </span> */}
                            {/* </div> */}
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Category:</span>
                                <span style={styles.infoValue}>
                                    {scanResult.content.category.map((cat, idx) => (
                                        <span key={idx} style={styles.categoryBadge}>{cat}</span>
                                    ))}
                                </span>
                            </div>
                            {scanResult.content.reason && scanResult.content.reason.length > 0 && (
                                <div style={{ marginTop: '0.8rem' }}>
                                    <span style={styles.infoLabel}>Reasons:</span>
                                    {scanResult.content.reason.map((reason, idx) => (
                                        <div key={idx} style={styles.reasonItem}>• {reason}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Redirects Section */}
                    {scanResult.redirects && (
                        <div style={styles.sectionBox}>
                            <div style={styles.sectionTitle}>🔄 Thrid Party Content : </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Cross-Domain:</span>
                                <span style={styles.infoValue}>
                                    {scanResult.redirects.cross_domain_content ? 'Yes ⚠️' : 'No ✓'}
                                </span>
                                
                            </div>
                            {scanResult.redirects.cross_domain_content &&
                                <div style={{ marginTop: '0.8rem' }}>
                                    <span style={styles.infoLabel}>
                                        It includes content from these domains:
                                    </span>

                                    <div style={{ marginTop: '0.5rem' }}>
                                        {scanResult.redirects.cross_domain_list.map((ele, index) => (
                                            <div key={index} style={styles.reasonItem}>
                                                {ele}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }

                            <div style={{ marginTop: '0.5rem' }}>
                                <span style={styles.infoLabel}>Info:</span>
                                <div style={styles.reasonItem}>{scanResult.redirects.redirect_len}</div>
                            </div>
                        </div>
                    )}

                    {/* Network Analysis Section */}
                    {scanResult.network && (
                        <div style={styles.sectionBox}>
                            <div style={styles.sectionTitle}>🌐 Network Analysis</div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>POST Requests:</span>
                                <span style={styles.infoValue}>{scanResult.network.post_requests}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>External Requests:</span>
                                <span style={styles.infoValue}>
                                    {scanResult.network.external_requests.length}
                                </span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>IP Requests:</span>
                                <span style={styles.infoValue}>
                                    {scanResult.network.ip_requests.length}
                                </span>
                            </div>
                            <div style={{ marginTop: '0.5rem' }}>
                                <span style={styles.infoLabel}>Info:</span>
                                <div style={styles.reasonItem}>
                                    {scanResult.network.ip_requests.length > 0 && 
                                    <span>Website trying to communicate with might be malicious network</span>}
                                    {scanResult.network.ip_requests.length == 0 && scanResult.network.external_requests.length >=10 &&
                                        <span>Website contains high External Request</span>}
                                    {scanResult.network.ip_requests.length == 0 && scanResult.network.external_requests.length == 0 &&
                                        <span>No Suspicious Network Activity Spotted</span>}
                                    {scanResult.network.ip_requests.length == 0 && scanResult.network.external_requests.length < 10 && scanResult.network.external_requests.length != 0 &&
                                        <span>Website sends request to other Domains </span>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Cookies Section */}
                    {scanResult.cookies && (
                        <div style={styles.sectionBox}>
                            <div style={styles.sectionTitle}>🍪 Cookie Security</div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Cookie Stealing Detected:</span>
                                <span style={styles.infoValue}>
                                    {scanResult.cookies.Cookie_Stealing.length > 0 ?
                                        `${scanResult.cookies.Cookie_Stealing.length} ⚠️` : 'None ✓'}
                                </span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoValue}>Send to URL</span>
                                <span style={styles.infoValue}>
                                    Data Send
                                </span>
                            </div>
                            {scanResult.cookies.Cookie_Stealing.map((ele, index) => (
                                <div key={index} style={styles.infoRow}>
                                    <span style={styles.infoleft}>{ele.url}</span>
                                    <span style={styles.infoleft}>
                                        {ele.cookie_data}
                                    </span>
                                </div>
                            ))}
                            
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div style={styles.buttonContainer}>
                        <button
                            style={styles.continueButton}
                            onClick={goToWebsite}
                        >
                            Continue to Website
                        </button>
                    </div>
                    <div style={styles.buttonContainer}>
                        <button
                            style={styles.continueButton}
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #1e3a8a, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    content: {
        textAlign: 'center',
    },
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem',
    },
    iconContainer: {
        position: 'relative',
    },
    pingCircle: {
        position: 'absolute',
        inset: 0,
        backgroundColor: '#3b82f6',
        borderRadius: '50%',
        opacity: 0.2,
        animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    },
    iconCircle: {
        position: 'relative',
        background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
        padding: '1.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanText: {
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: 0,
    },
    title: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '1rem',
    },
    dotsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
    },
    dot: {
        width: '0.75rem',
        height: '0.75rem',
        backgroundColor: '#60a5fa',
        borderRadius: '50%',
        animation: 'bounce 1s infinite',
    },
    // Results Screen Styles
    resultsContent: {
        width: '100%',
        maxWidth: '700px',
    },
    resultsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    resultsTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: '0.5rem',
    },
    riskBadge: {
        display: 'inline-block',
        padding: '0.5rem 1.5rem',
        borderRadius: '2rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
    },
    safeStatus: {
        backgroundColor: '#10b981',
        color: 'white',
    },
    warningStatus: {
        backgroundColor: '#f59e0b',
        color: 'white',
    },
    dangerStatus: {
        backgroundColor: '#ef4444',
        color: 'white',
    },
    sectionBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '0.5rem',
        padding: '1.2rem',
        marginBottom: '1rem',
    },
    sectionTitle: {
        color: '#60a5fa',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        marginBottom: '0.8rem',
        borderBottom: '2px solid rgba(96, 165, 250, 0.3)',
        paddingBottom: '0.5rem',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    infoLabel: {
        color: '#94a3b8',
        fontSize: '0.9rem',
    },
    infoValue: {
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '600',
        textAlign: 'right',
        maxWidth: '60%',
        wordBreak: 'break-word',
    },
    infoleft:{
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '600',
        textAlign: 'left',
        maxWidth: '60%',
        wordBreak: 'break-word',
        padding:"20px",
    },
    categoryBadge: {
        display: 'inline-block',
        backgroundColor: '#10b981',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '1rem',
        fontSize: '0.85rem',
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
    },
    reasonItem: {
        color: '#e2e8f0',
        fontSize: '0.9rem',
        padding: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '0.25rem',
        marginBottom: '0.5rem',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '1.5rem',
    },
    continueButton: {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.75rem 2rem',
        borderRadius: '0.5rem',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
    goBackButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        padding: '0.75rem 2rem',
        borderRadius: '0.5rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
};