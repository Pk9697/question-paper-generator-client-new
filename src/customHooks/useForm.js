import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4001'

function useForm() {
  const [formData, setFormData] = useState({
    totalMarks: 100,
    easyPercentage: 20,
    mediumPercentage: 50,
    hardPercentage: 30,
  })
  const [generateQP, setGenerateQP] = useState(false)
  const [questionsState, setQuestionsState] = useState({
    questions: [],
    isLoading: false,
    error: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setGenerateQP(false)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const fetchQuestions = async (formFields) => {
    setQuestionsState((prev) => ({
      ...prev,
      isLoading: true,
      questions: [],
      error: null,
    }))
    const url = `${API_URL}/api/v1/questions/generate`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    })
    const data = await res.json()
    if (data.success) {
      setQuestionsState((prev) => ({
        ...prev,
        isLoading: false,
        questions: data.data.questions,
        error: null,
      }))
    } else {
      setQuestionsState((prev) => ({
        ...prev,
        isLoading: false,
        questions: [],
        error: data.message,
      }))
      alert(data.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchQuestions(formData)
    setGenerateQP(true)
  }

  const handleReset = () => {
    setFormData({
      totalMarks: 100,
      easyPercentage: 20,
      mediumPercentage: 50,
      hardPercentage: 30,
    })
    setGenerateQP(false)
  }

  return {
    formData,
    generateQP,
    handleSubmit,
    handleReset,
    handleChange,
    questionsState,
  }
}

export default useForm
