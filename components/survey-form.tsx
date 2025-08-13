"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { supabase, type SurveyResponse } from "@/lib/supabase/client"
import { CheckCircle, Loader2 } from "lucide-react"

const questions = [
  "규칙적인 운동을 하고 있습니다",
  "균형 잡힌 식사를 하려고 노력합니다",
  "충분한 수면을 취하고 있습니다",
  "스트레스를 잘 관리하고 있습니다",
  "정기적으로 건강검진을 받습니다",
  "금연/금주를 실천하고 있습니다",
  "사회활동에 적극적으로 참여합니다",
  "새로운 것을 배우려고 노력합니다",
  "전반적으로 건강하다고 생각합니다",
]

const scaleLabels = [
  { value: 5, label: "매우 그렇다" },
  { value: 4, label: "그렇다" },
  { value: 3, label: "보통이다" },
  { value: 2, label: "그렇지 않다" },
  { value: 1, label: "전혀 그렇지 않다" },
]

export default function SurveyForm() {
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResponseChange = (questionIndex: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [`question_${questionIndex + 1}`]: Number.parseInt(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 모든 질문에 답변했는지 확인
    if (Object.keys(responses).length !== 9) {
      alert("모든 질문에 답변해 주세요.")
      return
    }

    setIsSubmitting(true)

    try {
      const surveyData: Omit<SurveyResponse, "id" | "created_at"> = {
        ...(responses as any),
        participant_age: age ? Number.parseInt(age) : undefined,
        participant_gender: gender || undefined,
        additional_comments: comments || undefined,
      }

      const { error } = await supabase.from("survey_responses").insert([surveyData])

      if (error) {
        throw error
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("설문조사 제출 오류:", error)
      alert("설문조사 제출 중 오류가 발생했습니다. 다시 시도해 주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-16">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-gray-800 mb-6">설문조사 완료</h2>
          <p className="text-2xl text-gray-600 leading-relaxed">
            소중한 시간을 내어 설문조사에 참여해 주셔서 감사합니다.
            <br />
            귀하의 의견은 연구에 큰 도움이 됩니다.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((question, index) => (
        <Card key={index} className="shadow-lg">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
              {index + 1}. {question}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <RadioGroup
              value={responses[`question_${index + 1}`]?.toString() || ""}
              onValueChange={(value) => handleResponseChange(index, value)}
              className="space-y-6"
            >
              {scaleLabels.map((scale) => (
                <div
                  key={scale.value}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RadioGroupItem
                    value={scale.value.toString()}
                    id={`q${index + 1}_${scale.value}`}
                    className="w-6 h-6"
                  />
                  <Label
                    htmlFor={`q${index + 1}_${scale.value}`}
                    className="text-xl md:text-2xl font-medium text-gray-700 cursor-pointer flex-1 leading-relaxed"
                  >
                    {scale.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      {/* 추가 정보 섹션 */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-800">추가 정보 (선택사항)</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div>
            <Label htmlFor="age" className="text-xl font-medium text-gray-700 mb-3 block">
              연령
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="예: 65"
              className="text-xl p-4 h-14"
              min="1"
              max="120"
            />
          </div>

          <div>
            <Label className="text-xl font-medium text-gray-700 mb-4 block">성별</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="space-y-4">
              <div className="flex items-center space-x-4 p-3">
                <RadioGroupItem value="male" id="male" className="w-5 h-5" />
                <Label htmlFor="male" className="text-xl text-gray-700 cursor-pointer">
                  남성
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-3">
                <RadioGroupItem value="female" id="female" className="w-5 h-5" />
                <Label htmlFor="female" className="text-xl text-gray-700 cursor-pointer">
                  여성
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="comments" className="text-xl font-medium text-gray-700 mb-3 block">
              추가 의견이나 건의사항
            </Label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="건강 관련하여 추가로 말씀하고 싶은 내용이 있으시면 자유롭게 작성해 주세요."
              className="text-xl p-4 min-h-32 leading-relaxed"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-center pt-8">
        <Button
          type="submit"
          disabled={isSubmitting || Object.keys(responses).length !== 9}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-semibold py-6 px-12 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              제출 중...
            </>
          ) : (
            "설문조사 제출하기"
          )}
        </Button>

        {Object.keys(responses).length !== 9 && (
          <p className="text-lg text-red-600 mt-4">모든 질문에 답변해 주세요. ({Object.keys(responses).length}/9)</p>
        )}
      </div>
    </form>
  )
}
