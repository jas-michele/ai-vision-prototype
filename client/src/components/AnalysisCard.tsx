type AnalysisCardProps = {
    result: string;
};

function AnalysisCard({ result }: AnalysisCardProps) {
    if (!result) return null;

    return (
        <div className="resul-section">
            <h2>AI Response</h2>
            <p>{result}</p>
        </div>
    );
}

export default AnalysisCard;