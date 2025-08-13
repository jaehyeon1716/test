import SurveyForm from "@/components/survey-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">건강 생활 설문조사</h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 leading-relaxed">귀하의 소중한 의견을 들려주세요</p>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              이 설문조사는 건강한 생활습관에 대한 인식을 조사하기 위한 것입니다.
              <br />
              모든 응답은 익명으로 처리되며, 연구 목적으로만 사용됩니다.
              <br />
              <span className="font-semibold text-indigo-600">총 9개의 질문</span>이 있으며, 각 질문에 대해 가장 적절한
              답변을 선택해 주세요.
            </p>
          </div>
        </div>
        <SurveyForm />
      </div>
    </div>
  )
}
